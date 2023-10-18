
const GrupoPesquisa = require('../models/grupo-pesquisa.model');
const S3Uploader = require('./aws.controller');



module.exports = {

  getTesesgp,
  insertTesesgp,
  deleteTesesgp,
  updateTesesgp,

  getPesquisasgp,
  insertPesquisasgp,
  deletePesquisasgp,
  updatePesquisasgp,

  getArtigosgp,
  insertArtigosgp,
  deleteArtigosgp,
  updateArtigosgp,

  getLivrosgp,
  insertLivrosgp,
  deleteLivrosgp,
  updateLivrosgp,

  getCapitulosgp,
  insertCapitulosgp,
  deleteCapitulosgp,
  updateCapitulosgp,

  getParticipantesgp,
  insertParticipantesgp,
  deleteParticipantesgp,
  updateParticipantesgp,

  getParceirosgp,
  insertParceirosgp,
  deleteParceirosgp,
  updateParceirosgp,

  getExtensaoEnsinogp,
  insertExtensaoEnsinogp,
  deleteExtensaoEnsinogp,
  updateExtensaoEnsinogp,
};


/*async function getExtensaoEnsinogp(req) {

  return await GrupoPesquisa.find({ type: req.query.type })
    .select('extensaoEnsino')
    .sort({
      'extensaoEnsino.$.createAt': -1,
    });
}*/

async function getExtensaoEnsinogp(req) {

  return await GrupoPesquisa.aggregate([
    { $match: { type: req.query.type } },
    { $unwind: '$extensaoEnsino' },
    { $sort: { 'extensaoEnsino.createAt': -1 } },
    { $group: { _id: '$_id', extensaoEnsino: { $push: '$extensaoEnsino' } } }]);


}

async function insertExtensaoEnsinogp(req, idUser) {

  let form = req.body;
  form.user = idUser;

  return await GrupoPesquisa.findOneAndUpdate({ type: req.query.type }, {
    '$push': {
      'extensaoEnsino': form
    }
  })

}

async function deleteExtensaoEnsinogp(id, req) {
  return await GrupoPesquisa.findOneAndUpdate(
    { type: req.query.type },
    { $pull: { extensaoEnsino: { _id: id } } },
    { new: true },
  )

}

async function updateExtensaoEnsinogp(req, idUser) {

  let form = req.body;
  form.user = idUser;

  return await GrupoPesquisa.findOneAndUpdate({
    type: req.query.type,
    'extensaoEnsino._id': form._id
  },
    {
      $set: {
        "extensaoEnsino.$": form
      }
    }
  );

}


async function getTesesgp(req) {

  return await GrupoPesquisa.aggregate([
    { $match: { type: req.query.type } },
    { $unwind: '$teses' },
    { $sort: { 'teses.createAt': -1 } },
    { $group: { _id: '$_id', teses: { $push: '$teses' } } }]);


}

async function insertTesesgp(req, idUser) {

  let form = req.body;
  form.user = idUser;

  return await GrupoPesquisa.findOneAndUpdate({ type: req.query.type }, {
    '$push': {
      'teses': form
    }
  })

}

async function deleteTesesgp(id, req) {
  return await GrupoPesquisa.findOneAndUpdate(
    { type: req.query.type },
    { $pull: { teses: { _id: id } } },
    { new: true },
  )

}

async function updateTesesgp(req, idUser) {

  let form = req.body;
  form.user = idUser;

  return await GrupoPesquisa.findOneAndUpdate({
    type: req.query.type,
    'teses._id': form._id
  },
    {
      $set: {
        "teses.$": form
      }
    }
  );

}





async function getPesquisasgp(req) {

  return await GrupoPesquisa.find({ type: req.query.type })
    .select('pesquisas')
    .sort({
      createAt: -1
    });
}

async function insertPesquisasgp(req, idUser) {

  let form = req.body;
  form.user = idUser;

  return await GrupoPesquisa.findOneAndUpdate({ type: req.query.type }, {
    '$push': {
      'pesquisas': form
    }
  })

}

async function deletePesquisasgp(id, req) {
  return await GrupoPesquisa.findOneAndUpdate(
    { type: req.query.type },
    { $pull: { pesquisas: { _id: id } } },
    { new: true },
  )

}

async function updatePesquisasgp(req, idUser) {

  let form = req.body;
  form.user = idUser;

  return await GrupoPesquisa.findOneAndUpdate({
    type: req.query.type,
    'pesquisas._id': form._id
  },
    {
      $set: {
        "pesquisas.$": form
      }
    }
  );

}

















async function getArtigosgp(req) {

  return await GrupoPesquisa.find({ type: req.query.type })
    .select('artigos')
    .sort({
      createAt: -1
    });
}

async function insertArtigosgp(req, idUser) {

  let form = req.body;
  form.user = idUser;

  return await GrupoPesquisa.findOneAndUpdate({ type: req.query.type }, {
    '$push': {
      'artigos': form
    }
  })

}

async function deleteArtigosgp(id, req) {
  return await GrupoPesquisa.findOneAndUpdate(
    { type: req.query.type },
    { $pull: { artigos: { _id: id } } },
    { new: true },
  )

}

async function updateArtigosgp(req, idUser) {

  let form = req.body;
  form.user = idUser;

  return await GrupoPesquisa.findOneAndUpdate({
    type: req.query.type,
    'artigos._id': form._id
  },
    {
      $set: {
        "artigos.$": form
      }
    }
  );

}






async function getLivrosgp(req) {

  return await GrupoPesquisa.find({ type: req.query.type })
    .select('livros')
    .sort({
      createAt: -1
    });
}

async function insertLivrosgp(req, idUser) {

  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  console.log(form)
  let fileName = 'images/grupo-geped/livros/' + req.files.fileArray.name;
  let retorno = { temErro: true };

  await S3Uploader.uploadBase64(fileName, req.files.fileArray.data)
    .then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;
      return await GrupoPesquisa.findOneAndUpdate({ type: req.query.type }, {
        '$push': {
          'livros': form
        }
      })
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });
}

async function deleteLivrosgp(id, req) {
  return await GrupoPesquisa.findOneAndUpdate(
    { type: req.query.type },
    { $pull: { livros: { _id: id } } },
    { new: true },
  )

}

async function updateLivrosgp(req, idUser) {

  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };
  if (req.files) {
    let fileName = 'images/grupo-geped/livros/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data)
      .then(async fileData => {
        console.log('Arquivos submetidos para AWS ' + fileName);
        form.imagePathS3 = fileName;
        retorno.temErro = false;

        return await GrupoPesquisa.findOneAndUpdate({
          type: req.query.type,
          'livros._id': form._id
        },
          {
            "livros.$": form
          },
          {
            upsert: true
          }
        );
      }, err => {
        console.log('Erro ao enviar imagem para AWS: ' + fileName);
        retorno.temErro = true;
        retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
      });

  } else {
    return await GrupoPesquisa.findOneAndUpdate({
      type: req.query.type,
      'livros._id': form._id
    },
      {
        $set: {
          "livros.$": form
        }
      }
    );
  }
}











async function getParceirosgp(req) {

  return await GrupoPesquisa.find({ type: req.query.type })
    .select('parceiros')
    .sort({
      createAt: -1
    });
}

async function insertParceirosgp(req, idUser) {

  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  console.log(form)
  let fileName = 'images/grupo-geped/parceiros/' + req.files.fileArray.name;
  let retorno = { temErro: true };

  await S3Uploader.uploadBase64(fileName, req.files.fileArray.data)
    .then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;
      return await GrupoPesquisa.findOneAndUpdate({ type: req.query.type }, {
        '$push': {
          'parceiros': form
        }
      })
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });
}

async function deleteParceirosgp(id, req) {
  return await GrupoPesquisa.findOneAndUpdate(
    { type: req.query.type },
    { $pull: { parceiros: { _id: id } } },
    { new: true },
  )

}

async function updateParceirosgp(req, idUser) {

  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };
  if (req.files) {
    let fileName = 'images/grupo-geped/parceiros/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data)
      .then(async fileData => {
        console.log('Arquivos submetidos para AWS ' + fileName);
        form.imagePathS3 = fileName;
        retorno.temErro = false;

        return await GrupoPesquisa.findOneAndUpdate({
          type: req.query.type,
          'parceiros._id': form._id
        },
          {
            "parceiros.$": form
          },
          {
            upsert: true
          }
        );
      }, err => {
        console.log('Erro ao enviar imagem para AWS: ' + fileName);
        retorno.temErro = true;
        retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
      });

  } else {
    return await GrupoPesquisa.findOneAndUpdate({
      type: req.query.type,
      'parceiros._id': form._id
    },
      {
        $set: {
          "parceiros.$": form
        }
      }
    );
  }
}













async function getCapitulosgp(req) {

  return await GrupoPesquisa.find({ type: req.query.type })
    .select('capitulos')
    .sort({
      createAt: -1
    });
}

async function insertCapitulosgp(req, idUser) {

  let form = req.body;
  form.user = idUser;

  return await GrupoPesquisa.findOneAndUpdate({ type: req.query.type }, {
    '$push': {
      'capitulos': form
    }
  })

}

async function deleteCapitulosgp(id, req) {
  return await GrupoPesquisa.findOneAndUpdate(
    { type: req.query.type },
    { $pull: { capitulos: { _id: id } } },
    { new: true },
  )

}

async function updateCapitulosgp(req, idUser) {

  let form = req.body;
  form.user = idUser;

  return await GrupoPesquisa.findOneAndUpdate({
    type: req.query.type,
    'capitulos._id': form._id
  },
    {
      $set: {
        "capitulos.$": form
      }
    }
  );

}











async function getParticipantesgp(req) {

  return await GrupoPesquisa.find({ type: req.query.type })
    .select('participantes')
    .sort({
      createAt: -1
    });
}

async function insertParticipantesgp(req, idUser) {

  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let fileName = 'images/grupo-geped/participante/' + req.files.fileArray.name;
  let retorno = { temErro: true };

  await S3Uploader.uploadBase64(fileName, req.files.fileArray.data)
    .then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;
      return await GrupoPesquisa.findOneAndUpdate({ type: req.query.type }, {
        '$push': {
          'participantes': form
        }
      })
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });
}

async function deleteParticipantesgp(id, req) {
  return await GrupoPesquisa.findOneAndUpdate(
    { type: req.query.type },
    { $pull: { participantes: { _id: id } } },
    { new: true },
  )

}

async function updateParticipantesgp(req, idUser) {

  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };
  if (req.files) {
    let fileName = 'images/grupo-geped/livros/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data)
      .then(async fileData => {
        console.log('Arquivos submetidos para AWS ' + fileName);
        form.imagePathS3 = fileName;
        retorno.temErro = false;

        return await GrupoPesquisa.findOneAndUpdate({
          type: req.query.type,
          'participantes._id': form._id
        },
          {
            "participantes.$": form
          },
          {
            upsert: true
          }
        );
      }, err => {
        console.log('Erro ao enviar imagem para AWS: ' + fileName);
        retorno.temErro = true;
        retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
      });

  } else {
    return await GrupoPesquisa.findOneAndUpdate({
      type: req.query.type,
      'participantes._id': form._id
    },
      {
        $set: {
          "participantes.$": form
        }
      }
    );
  }


}