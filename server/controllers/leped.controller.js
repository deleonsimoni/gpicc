

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
  montarHomeLeped,

  getQuemSomos,
  insertQuemSomos,
  deleteQuemSomos,
  updateQuemSomos,

  getCoordenadoras,
  insertCoordenadoras,
  deleteCoordenadoras,
  updateCoordenadoras,

  getEventos,
  insertEventos,
  deleteEventos,
  updateEventos,

  getGaleria,
  insertGaleria,
  deleteGaleria,
  updateGaleria,

  getGrupoPesquisa,
  insertGrupoPesquisa,
  deleteGrupoPesquisa,
  updateGrupoPesquisa,

  getNoticia,
  getNoticiaCarrossel,
  insertNoticia,
  deleteNoticia,
  updateNoticia,


};

async function montarHomeLeped() {
  let response = {};

  response.coordenadoras = await Coordenadoras.find();

  response.galeria = await Galeria.find().select('imagePathS3');

  return response;
}

async function getQuemSomos(locale) {

  if (locale == 'us') {
    return quemsomosTranslate;
  } else {
    return await QuemSomos.find()
      .sort({
        createAt: -1
      });
  }

}

async function insertQuemSomos(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let fileName = 'images/' + req.files.fileArray.name;
  await S3Uploader.uploadBase64(fileName, buf).then(async fileData => {
    console.log('Arquivo submetido para AWS ' + fileName);
    form.imagePathS3 = fileName;
    retorno.temErro = false;
    return await new QuemSomos(form).save();
  }, err => {
    console.log('Erro ao enviar imagem para AWS: ' + fileName);
    retorno.temErro = true;
    retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
  });
}

async function deleteQuemSomos(id) {
  return await QuemSomos.findOneAndRemove({
    _id: id
  });
}

async function updateQuemSomos(req, idUser) {

  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {

      console.log('Arquivo submetido para AWS ' + fileName);
      form.logo = fileName;
      retorno.temErro = false;

      return await QuemSomos.findOneAndUpdate({
        _id: form._id
      },
        form, {
        upsert: true
      });

    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });
  } else {
    return await QuemSomos.findOneAndUpdate({
      _id: form._id
    },
      form, {
      upsert: true
    });
  }

}

async function getCoordenadoras() {
  return await Coordenadoras.find()
    .sort({
      createAt: -1
    });
}

async function insertCoordenadoras(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let fileName = 'images/' + req.files.fileArray.name;
  let retorno = { temErro: true };

  await S3Uploader.uploadBase64(fileName, req.files.fileArray.data)
    .then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;
      return await new Coordenadoras(form).save();
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });
}

async function deleteCoordenadoras(id) {
  return await Coordenadoras.findOneAndRemove({
    _id: id
  });
}

async function updateCoordenadoras(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data)
      .then(async fileData => {
        console.log('Arquivos submetidos para AWS ' + fileName);
        form.imagePathS3 = fileName;
        retorno.temErro = false;

        return await Coordenadoras.findOneAndUpdate({
          _id: form._id
        },
          form, {
          upsert: true
        });
      }, err => {
        console.log('Erro ao enviar imagem para AWS: ' + fileName);
        retorno.temErro = true;
        retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
      });

  } else {
    return await Coordenadoras.findOneAndUpdate({
      _id: form._id
    },
      form, {
      upsert: true
    });
  }
}

async function getEventos(locale) {
  if (locale == 'us') {
    return eventoTranslate;
  } else {
    return await Eventos.find()
      .sort({
        createAt: -1
      });
  }
}

async function insertEventos(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;
      return await new Eventos(form).save();
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });

  } else {
    return await new Eventos(form).save();
  }
}

async function deleteEventos(id) {
  return await Eventos.findOneAndRemove({
    _id: id
  });
}

async function updateEventos(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {

    let fileName = 'images/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;

      return await Eventos.findOneAndUpdate({
        _id: form._id
      },
        form, {
        upsert: true
      });
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });

  } else {
    return await Eventos.findOneAndUpdate({
      _id: form._id
    },
      form, {
      upsert: true
    });
  }
}

async function getGaleria() {
  return await Galeria.find()
    .sort({
      createAt: -1
    });
}

async function insertGaleria(req, idUser) {
  let retorno = { temErro: true };
  let form = {
    user: idUser
  }
  let fileName = [];

  if (req.files?.galeria1) {
    let promises = [];

    Object.keys(req.files).forEach(el => {
      if (el.includes("galeria")) {
        fileName.push('images/' + req.files[el].name);
        promises.push(S3Uploader.uploadBase64('images/' + req.files[el].name, req.files[el].data));
      }
    });

    try {
      await Promise.all(promises);
      retorno.temErro = false;
    } catch (error) {
      fileName.forEach(name => {
        console.log('Erro ao enviar imagens para AWS: ' + name);
      });

      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    }
  }

  if (!retorno.temErro) {
    const promises = [];

    fileName.forEach(name => {
      form["imagePathS3"] = name;
      promises.push(new Galeria(form).save());
    });

    return await Promise.all(promises)
  }
}

async function deleteGaleria(id) {
  return await Galeria.findOneAndRemove({
    _id: id
  });
}

async function updateGaleria(form, idUser) {
  form.user = idUser;
  return await Galeria.findOneAndUpdate({
    _id: form._id
  },
    form, {
    upsert: true
  });
}

async function getGrupoPesquisa(user) {
  return await GrupoPesquisa.find({ type: { $in: user.roles } })
    .sort({
      createAt: -1
    });
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

async function deleteGrupoPesquisa(id) {
  return await GrupoPesquisa.findOneAndRemove({
    _id: id
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

async function getNoticia() {
  return await Noticia.find()
    .sort({
      createAt: -1
    });
}

async function getNoticiaCarrossel() {
  return await Noticia.find({ isCarrossel: true })
    .sort({
      ordem: 1
    });
}

async function insertNoticia(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;
      return await new Noticia(form).save();
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });

  } else {
    return await new Noticia(form).save();
  }
}


async function deleteNoticia(id) {
  return await Noticia.findOneAndRemove({
    _id: id
  });
}

async function updateNoticia(req, idUser) {

  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;

      return await Noticia.findOneAndUpdate({
        _id: form._id
      },
        form, {
        upsert: true
      });
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });

  } else {
    return await Noticia.findOneAndUpdate({
      _id: form._id
    },
      form, {
      upsert: true
    });
  }

}
