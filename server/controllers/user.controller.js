const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const S3Uploader = require('./aws.controller');
const paginate = require("jw-paginate");


const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
});

module.exports = {
  insert,
  updateBio,
  getUsers,
  negarComprovante,
  confirmComprovante,
  resetPassword,
  changePassword,
  getUsersAdmin,
  setAdmin,
  unsetAdmin,
  unsetPostarAcervo,
  setPostarAcervo
};

async function confirmComprovante(id) {
  return await User.findByIdAndUpdate(id,
    {
      icComprovanteValido: true
    },
    {
      upsert: true
    }
  );
}

async function negarComprovante(id) {
  return await User.findByIdAndUpdate(id,
    {
      icComprovanteValido: false,
    },
    {
      upsert: true
    }
  );
}

async function unsetAdmin(id) {
  return await User.findOneAndUpdate(
    { _id: id, },
    { $pull: { roles: "admin" } },
    { upsert: false }
  );

}


async function setAdmin(id) {
  return await User.findOneAndUpdate(
    { _id: id, },
    { $addToSet: { roles: "admin" } },
    { upsert: false }
  );

}


async function unsetPostarAcervo(id) {
  return await User.findOneAndUpdate(
    { _id: id, },
    { $pull: { roles: "poster" } },
    { upsert: false }
  );

}


async function setPostarAcervo(id) {
  return await User.findOneAndUpdate(
    { _id: id, },
    { $addToSet: { roles: "poster" } },
    { upsert: false }
  );

}


async function getUsersAdmin() {

  usersFound = await User.find()
    .sort({
      fullname: 1,
    })

  return usersFound;
}


async function getUsers(req) {
  const pageSize = 10;
  const page = req.query.page || 1;
  let usersFound = [];
  let search = JSON.parse(req.query.search);

  usersFound = await User.find(search)

    .sort({
      fullname: 1,
    })
    .skip(pageSize * page - pageSize)
    .limit(pageSize);

  numbOfUsers = await User.count(search);

  const pager = paginate(numbOfUsers, page, pageSize);

  return {
    usersFound,
    pager,
  };
}

async function changePassword(idUser, password) {

  var hashedPassword = bcrypt.hashSync(password, 10);

  return await User.findOneAndUpdate({
    _id: idUser
  },
    { hashedPassword, icAdminChangePassword: false }, {
    upsert: true
  });

}


async function resetPassword(idUser, password) {
  var hashedPassword = bcrypt.hashSync(password, 10);

  return await User.findOneAndUpdate({
    _id: idUser
  },
    { hashedPassword, icAdminChangePassword: true }, {
    upsert: true
  });

}

async function insert(req) {

  let user = JSON.parse(req.body.formulario);
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  let retorno = {};

  if (retorno.temErro) {
    return 'Ocorreu um erro ao registrar';
  } else {
    return await new User(user).save();
  }
}

async function updateBio(req) {
  let form = { bio: JSON.parse(req.body.formulario) };
  let retorno = { temErro: true };

  if (req.files) {
    let fileName = 'images/usuarios/' + req.user._id + '/' + req.files.fileArray.name;
    await S3Uploader.uploadBase64(fileName, req.files.fileArray.data).then(async fileData => {
      console.log('Arquivo submetido para AWS ' + fileName);
      form.image = fileName;
      retorno.temErro = false;
      return await User.findOneAndUpdate({
        _id: req.user._id
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
    return await User.findOneAndUpdate({
      _id: req.user._id
    },
      form, {
      upsert: true
    });
  }

  return "Ok";

}
