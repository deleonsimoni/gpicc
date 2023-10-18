const mongoose = require('mongoose');

const QuemSomosSchema = new mongoose.Schema(
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

    subTitle: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    logo: {
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

module.exports = mongoose.model('QuemSomos', QuemSomosSchema);
