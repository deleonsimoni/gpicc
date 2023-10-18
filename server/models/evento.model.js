const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema(
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

    content: {
      type: String,
    },

    subTitle: {
      type: String,
    },

    period: {
      type: String,
    },

    imagePathS3: {
      type: String,
    },
    externalLink: {
      type: String,
    },
    facebook: {
      type: String,
    },

    youtube: {
      type: String,
    },

    instagram: {
      type: String,
    },

    twitter: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Evento', EventoSchema);
