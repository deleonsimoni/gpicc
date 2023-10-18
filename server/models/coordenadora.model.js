const mongoose = require('mongoose');

const CoordenadoraSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    createAt: {
      type: Date,
      default: Date.now
    },

    name: {
      type: String,
      required: true
    },

    group: {
      type: String,
      required: true
    },

    email: {
      type: String
    },

    imagePathS3: {
      type: String,
    },

    orcid: {
      type: String,
    },

    lattes: {
      type: String,
    },

    instagram: {
      type: String,
    },

    twitter: {
      type: String,
    },

    facebook: {
      type: String,
    },

  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Coordenadora', CoordenadoraSchema);
