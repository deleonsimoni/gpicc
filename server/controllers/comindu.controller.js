
const Tag = require('../models/tag.model');
const Comunidade = require('../models/comunidade.model');

const User = require('../models/user.model');
const S3Uploader = require('./aws.controller');

module.exports = {
  getUserInscricoes,
  getTags,
  getComunidades,
  getComunidadesById,

  insertComunidade,
  updateComunidade,

  subscribeComunidade,
  unsubscribeComunidade,

  postSend,

  getChats,
  deletePost,
  blockPost,
  unblockPost,
  postChat,
  deleteChat,


  minhasComunidades,

  inativarComunidade,
  ativarComunidade,

  deleteComunidade,

  listAdmins,


};

async function inativarComunidade(id) {
  return await Comunidade.findByIdAndUpdate(id,
    {
      isAtiva: false
    },
    {
      upsert: true
    }
  );

}

async function ativarComunidade(id) {
  return await Comunidade.findByIdAndUpdate(id,
    {
      isAtiva: true
    }
  );

}

async function getTags() {
  return await Tag.find().select("name");
}

async function getComunidades(user) {
  if (user?.roles?.includes('admin')) {
    return await Comunidade.find().select("name content cor tags isAtiva imagePathS3 owners")
      .populate('owners', 'email');
  } else {
    return await Comunidade.find({ isAtiva: true }).select("name content cor tags isAtiva");
  }
}

async function minhasComunidades(id) {
  return await User.findById(id)
    .select("name bio socialname image")
    .populate('comunidades.idComunidade');
}


async function getComunidadesById(id) {
  return await Comunidade
    .findById(id)
    .select("name content cor tags imagePathS3 posts.content posts.createAt posts.blockComment posts._id isAtiva")
    .populate('subscribers.userId', 'socialname bio image')
    .populate('posts.user', 'socialname image')
    ;

}

async function getChats(idComunidade, idPost) {
  return await Comunidade
    .find({ "_id": idComunidade, "posts._id": idPost }, { "posts.$": 1 })
    //.select("posts.chats")
    .populate('posts.chats.user', 'socialname bio image')

}

async function deletePost(idComunidade, idPost) {
  return await Comunidade.findOneAndUpdate(
    { _id: idComunidade },
    { $pull: { posts: { _id: idPost } } },
    { new: true },
  )
}

async function blockPost(idComunidade, idPost) {
  return await Comunidade.findOneAndUpdate(
    {
      _id: idComunidade,
      'posts._id': idPost
    },
    {
      $set: {
        "posts.$.blockComment": true
      }
    },
    { new: true }

  );
}

async function unblockPost(idComunidade, idPost) {
  return await Comunidade.findOneAndUpdate(
    {
      _id: idComunidade,
      'posts._id': idPost
    },
    {
      $set: {
        "posts.$.blockComment": false
      }
    },
    { new: true }

  );
}

async function listAdmins() {
  return await User
    .find({ roles: { $in: 'admin' } })
    .select("email")
}

async function postChat(comunidade, post, userId, body) {

  let data = {
    user: userId,
    message: body.post
  };

  return Comunidade.findOneAndUpdate({
    "_id": comunidade,
    "posts._id": post
  }, {
    $addToSet: {
      'posts.$.chats': data
    }
  }, {
    new: true
  });

}

async function deleteChat(comunidade, post, idChat) {
  return await Comunidade.findOneAndUpdate(
    { _id: comunidade, "posts._id": post },
    { $pull: { "posts.$.chats": { _id: idChat } } }
  )

}

async function deleteComunidade(comunidade) {
  return await Comunidade.findByIdAndDelete(comunidade);
}

async function getUserInscricoes(user) {
  return await Tag.find();
}

async function insertComunidade(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };
  let tagSave;

  if (req.files) {
    let fileName = 'images/comindu/comunidades' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.imagePathS3 = fileName;
      retorno.temErro = false;
      return await new Comunidade(form).save();
    }, err => {
      console.log('Erro ao enviar imagem para AWS: ' + fileName);
      retorno.temErro = true;
      retorno.mensagem = 'Servidor momentaneamente inoperante. Tente novamente mais tarde.';
    });

  } else {
    await new Comunidade(form).save();
  }

  if (form.tags) {
    form.tags.forEach(tag => {
      tagSave = { user: idUser, name: tag };
      new Tag(tagSave).save();
    });
  }

  return "Ok";

}

async function updateComunidade(req, idUser) {
  let form = JSON.parse(req.body.formulario);
  form.user = idUser;
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/comindu/comunidades' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data)
      .then(async fileData => {
        console.log('Arquivos submetidos para AWS ' + fileName);
        form.imagePathS3 = fileName;
        retorno.temErro = false;

        return await Comunidade.findOneAndUpdate({
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
    return await Comunidade.findOneAndUpdate({
      _id: form._id
    },
      form, {
      upsert: true
    });
  }

}

async function postSend(comunidade, userId, body) {

  let data = {
    user: userId,
    content: body.post
  };

  return Comunidade.findOneAndUpdate({
    _id: comunidade
  }, {
    $addToSet: {
      'posts': data
    }
  }, {
    new: true
  });

}

async function subscribeComunidade(comunidade, userId) {
  /* let checkIsDup = await checkSubscribeDup(comunidade, userId);
 
   if (checkIsDup && checkIsDup.isDup) {
 
     return checkIsDup;
 
   } else {*/

  let userInsert = {
    userId: userId,
  }

  await User.findOneAndUpdate({
    _id: userId
  }, {
    $addToSet: {
      'comunidades': {
        idComunidade: comunidade
      }
    }
  }, {
    upsert: true,
    new: true
  });

  return Comunidade.findOneAndUpdate({
    _id: comunidade
  }, {
    $addToSet: {
      'subscribers': userInsert
    }
  }, {
    new: true
  });

  // }
}

async function unsubscribeComunidade(comunidade, userId) {

  await User.findOneAndUpdate({
    _id: userId
  }, {
    $pull: {
      comunidades: {
        'idComunidade': comunidade
      }

    }
  });

  return await Comunidade.findOneAndUpdate({
    _id: comunidade
  }, {
    $pull: {
      subscribers: {
        userId: userId
      }
    }
  }, {
    new: true
  });
}