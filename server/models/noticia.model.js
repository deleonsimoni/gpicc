const mongoose = require('mongoose');

const NoticiaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    createAt: {
      type: Date,
      default: Date.now
    },

    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
    },

    imagePathS3: {
      type: String,
    },

    autor: {
      type: String,
    },

    ano: {
      type: Number,
    }

  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Noticia', NoticiaSchema);