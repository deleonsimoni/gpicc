const mongoose = require('mongoose');

const GrupoCapituloSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    createAt: {
      type: Date,
      default: Date.now
    },
    /* type: {
       type: String,
       required: true
     },*/

    titleChapter: {
      type: String,
    },
    authorsChapter: [{
      name: String
    }],

    titleBook: {
      type: String,
    },
    eds: {
      type: String,
    },
    publisher: {
      type: String,
    },
    edition: {
      type: String,
    },
    location: {
      type: String,
    },
    vol: {
      type: String,
    },
    pages: {
      type: String,
    },
    year: {
      type: String,
    }


  },

  {
    versionKey: false,
  }
);

module.exports = mongoose.model('GrupoCapitulo', GrupoCapituloSchema);
