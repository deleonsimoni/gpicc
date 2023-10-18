
const GrupoPesquisa = require('../models/grupo-pesquisa.model');
const quemsomosTranslate = require('../translate/gepedQuemSomos.json');
const ensinoExtensaoTranslate = require('../translate/ensinoExtensao.json');
const pesquisasTranslate = require('../translate/pesquisasRealizadas.json');




module.exports = {

  getHome,
  getPesquisa,
  getLivro,
  getArtigos,
  getCapitulos,
  getTeses,
  getExtensaoEnsino

};


async function getHome(req) {

  if (req.headers.locale == 'us' && req.query.type == 'geped') {
    return quemsomosTranslate;
  } else {
    return await GrupoPesquisa.find({ type: req.query.type })
      .select('title subTitle content imagePathS3 facebook youtube instagram twitter galeria participantes parceiros')
      .sort({
        'createAt': -1
      });
  }


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
