
const QuemSomos = require('../models/quem-somos.model');
const Noticia = require('../models/noticia.model');
const Coordenadoras = require('../models/coordenadora.model');
const Eventos = require('../models/evento.model');
const Galeria = require('../models/galeria.model');
const GrupoPesquisa = require('../models/grupo-pesquisa.model');
const S3Uploader = require('./aws.controller');
const quemsomosTranslate = require('../translate/quemsomos.json');
const eventoTranslate = require('../translate/evento.json');


module.exports = {

  getHome,
  getPesquisa,
  getLivro,
  getArtigos,
  getCapitulos,
  getTeses,
  getExtensaoEnsino,
  getGrupoPesquisa,
  updateGrupoPesquisa,
  insertGrupoPesquisa,
  getNoticia,



};

async function getGrupoPesquisa(user) {
  return await GrupoPesquisa.find({ type: { $in: user.roles } })
    .sort({
      createAt: -1
    });
}

async function getHome(req) {


  return await GrupoPesquisa.find({ type: req.query.type })
    .select('title subTitle content imagePathS3 facebook youtube instagram twitter galeria participantes parceiros')
    .sort({
      'createAt': -1
    });



}

async function getPesquisa(req) {

  if (req.headers.locale == 'us' && req.query.type == 'geped') {
    return pesquisasTranslate;
  } else {
    let tipo = req.query.typePesquisa == 1 ? 'Realizada' : 'Em Andamento'
    return await GrupoPesquisa.aggregate([
      { $match: { type: req.query.type } },
      { $unwind: '$pesquisas' },
      { $match: { 'pesquisas.icPesquisa': tipo } },
      { $sort: { 'pesquisas.ordem': -1 } },
      { $group: { _id: '$_id', pesquisas: { $push: '$pesquisas' } } }]);
  }




}



async function getExtensaoEnsino(req) {
  if (req.query.type == 'gedoc') {

    let tipo = req.query.typeExtensao == 1 ? 'Realizados' : 'Em Andamento'
    return await GrupoPesquisa.aggregate([
      { $match: { type: req.query.type } },
      { $unwind: '$extensaoEnsino' },
      { $match: { 'extensaoEnsino.icEnsino': tipo } },
      { $sort: { 'extensaoEnsino.createAt': -1 } },
      { $group: { _id: '$_id', extensaoEnsino: { $push: '$extensaoEnsino' } } }]);

  }
  else {

    if (req.headers.locale == 'us' && req.query.type == 'geped') {
      return ensinoExtensaoTranslate;
    } else {
      return await GrupoPesquisa.aggregate([
        { $match: { type: req.query.type } },
        { $unwind: '$extensaoEnsino' },
        { $sort: { 'extensaoEnsino.createAt': -1 } },
        { $group: { _id: '$_id', extensaoEnsino: { $push: '$extensaoEnsino' } } }]);
    }

  }


}


async function getLivro(req) {
  return await GrupoPesquisa.aggregate([
    { $match: { type: req.query.type } },
    { $unwind: '$livros' },
    { $sort: { 'livros.ordem': -1 } },
    { $group: { _id: '$_id', livros: { $push: '$livros' } } }]);
}

async function getArtigos(req) {
  return await GrupoPesquisa.aggregate([
    { $match: { type: req.query.type } },
    { $unwind: '$artigos' },
    { $group: { _id: '$_id', artigos: { $push: '$artigos' } } }])
}

async function getCapitulos(req) {
  return await GrupoPesquisa.aggregate([
    { $match: { type: req.query.type } },
    { $unwind: '$capitulos' },
    { $sort: { 'capitulos.ordem': -1 } },
    { $group: { _id: '$_id', capitulos: { $push: '$capitulos' } } }]);
}

async function getTeses(req) {

  return await GrupoPesquisa.aggregate([
    { $match: { type: req.query.type } },
    { $unwind: '$teses' },
    { $sort: { 'teses.createAt': -1 } },
    { $group: { _id: '$_id', teses: { $push: '$teses' } } }]);
}



async function insertGrupoPesquisa(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  let retorno = { temErro: true };
  form.user = idUser;

  if (req.files?.fotoGrupo) {
    let fileName1 = 'images/' + req.files.fotoGrupo.name;

    try {
      await S3Uploader.uploadBase64(fileName1, req.files.fotoGrupo.data);
      console.log('Arquivo submetido para AWS ' + fileName1);
      form.imagePathS3 = fileName1;
      retorno.temErro = false;
    } catch (error) {
      console.log('Erro ao enviar imagem para AWS: ' + fileName1);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    }
  }

  if (req.files?.fotoCoordenadora) {
    let fileName2 = 'images/' + req.files.fotoCoordenadora.name;

    try {
      await S3Uploader.uploadBase64(fileName2, req.files.fotoCoordenadora.data);
      console.log('Arquivo submetido para AWS ' + fileName2);
      form.coordenadoraImage = fileName2;
      retorno.temErro = false;
    } catch (error) {
      console.log('Erro ao enviar imagem para AWS: ' + fileName2);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    }
  }

  if (req.files?.galeria1) {
    let promises = [], fileName = [];

    Object.keys(req.files).forEach(el => {
      if (el.includes("galeria")) {
        fileName.push('images/' + req.files[el].name);
        promises.push(S3Uploader.uploadBase64('images/' + req.files[el].name, req.files[el].data));
      }
    });

    try {
      await Promise.all(promises);
      form.galeria = fileName;
      retorno.temErro = false;
    } catch (error) {
      console.log('Erro ao enviar imagem para AWS: ' + fileName2);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    }
  }

  if (!retorno.temErro) {
    return await new GrupoPesquisa(form).save();
  }
}

async function getNoticia() {
  return await Noticia.find()
    .sort({
      createAt: -1
    });
}

async function updateGrupoPesquisa(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  let retorno = { temErro: false };
  form.user = idUser;

  if (req.files?.fotoGrupo) {
    let fileName1 = 'images/' + req.files.fotoGrupo.name;

    try {
      await S3Uploader.uploadBase64(fileName1, req.files.fotoGrupo.data);
      console.log('Arquivo submetido para AWS ' + fileName1);
      form.imagePathS3 = fileName1;
    } catch (error) {
      console.log('Erro ao enviar imagem para AWS: ' + fileName1);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    }
  }

  if (req.files?.fotoCoordenadora && !retorno.temErro) {
    let fileName2 = 'images/' + req.files.fotoCoordenadora.name;

    try {
      await S3Uploader.uploadBase64(fileName2, req.files.fotoCoordenadora.data);
      console.log('Arquivo submetido para AWS ' + fileName2);
      form.coordenadoraImage = fileName2;
    } catch (error) {
      console.log('Erro ao enviar imagem para AWS: ' + fileName2);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    }
  }

  if (req.files?.galeria1 && !retorno.temErro) {
    let promises = [], fileName = [];

    Object.keys(req.files).forEach(el => {
      if (el.includes("galeria")) {
        fileName.push('images/' + req.files[el].name);
        promises.push(S3Uploader.uploadBase64('images/' + req.files[el].name, req.files[el].data));
      }
    });

    try {
      await Promise.all(promises);
      form.galeria = form.galeria.concat(fileName);
    } catch (error) {
      console.log('Erro ao enviar imagem para AWS: ' + fileName2);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    }
  }

  if (!retorno.temErro) {
    return await GrupoPesquisa.findOneAndUpdate({
      _id: form._id
    },
      form, {
      upsert: true
    });
  }
}