const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    socialname: {
      type: String
    },
    nick: {
      type: String
    },
    bio: {
      type: String
    },
    image: {
      type: String
    },

    icAcceptTerms: {
      type: Boolean,
      default: false
    },
    dateBirth: {
      type: Date
    },

    comprovanteProfessorPath: {
      type: String
    },

    comunidades: [
      {
        idComunidade: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comunidade'
        }
      }
    ],

    icComprovanteValido: {
      type: Boolean
    },

    icAdminChangePassword: {
      type: Boolean,
      default: false
    },

    address: {
      street: String,
      complement: String,
      num: String,
      zip: String,
      city: String,
      district: String,
      country: String,
      state: String
    },
    phones: {
      cellphone: String,
      telephone: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
      match: [
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    roles: [
      {
        type: String,
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('User', UserSchema);
