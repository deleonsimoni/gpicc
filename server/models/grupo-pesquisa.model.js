const mongoose = require('mongoose');

const GrupoPesquisaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    createAt: {
      type: Date,
      default: Date.now
    },

    type: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    },

    subTitle: {
      type: String,
    },

    content: {
      type: String,
      required: true
    },

    imagePathS3: {
      type: String,
    },

    coordenadoraName: {
      type: String,
    },

    coordenadoraImage: {
      type: String,
    },

    endereco: {
      type: String,
    },

    enderecoGoogle: {
      type: String,
    },

    telefone: {
      type: String,
    },

    funcionamento: {
      type: String,
    },

    email: {
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

    galeria: [
      {
        type: String
      }
    ],

    participantes: [{

      name: {
        type: String,

      },
      email: {
        type: String,
      },

      orcid: {
        type: String
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
      imagePathS3: {
        type: String,
      },
      createAt: {
        type: Date,
        default: Date.now
      },


    }],
    parceiros: [{

      parceriaName: {
        type: String,

      },
      parceriaDesc: {
        type: String,

      },
      imagePathS3: {
        type: String,
      }
    }],

    extensaoEnsino: [{

      icEnsino: {
        type: String,
      },

      title: {
        type: String,

      },
      date: {
        type: String,
      },
      type: {
        type: String,

      },
      resume: {
        type: String,

      },

      coordination: {
        type: String,

      },

      financing: {
        type: String,
      },

      researchLink: {
        type: String,
      },

      publications: [{
        type: String,
      }],

      link: {
        type: String,
      },
      linkYoutube: {
        type: String,
      },
      createAt: {
        type: Date,
        default: Date.now
      },

    }],

    pesquisas: [{

      icPesquisa: {
        type: String,
        required: true
      },

      titleResearch: {
        type: String,
        required: true
      },

      resume: {
        type: String,
        required: true
      },

      coordination: {
        type: String,
        required: true
      },

      period: {
        type: String,
        required: true
      },

      financing: {
        type: String,
      },

      researchLink: {
        type: String,
      },

      publications: [{
        type: String,
      }],

      createAt: {
        type: Date,
        default: Date.now
      },

    }],

    artigos: [{

      titleArticle: {
        type: String,
      },
      authorsArticle: {

        type: String,
      },
      journalArticle: {
        type: String,
      },

      linkArticle: {
        type: String,
      },
      ordem: {
        type: String,
      },

      createAt: {
        type: Date,
        default: Date.now
      }

    }],
    teses: [{

      icTese: {
        type: String,
      },
      categoryId: {
        type: String,
      },
      titleTesis: {
        type: String,
      },
      authorTesis: {

        type: String,
      },

      dateTesis: {
        type: String,
      },
      linkTesis: {
        type: String,
      },

      createAt: {
        type: Date,
        default: Date.now
      },
    }],

    livros: [{

      titleBook: {
        type: String,
      },
      authorsBook: {

        type: String,
      },

      linkBook: {
        type: String,
      },

      imagePathS3: {
        type: String,
      },
      ordem: {
        type: String,
      },

      createAt: {
        type: Date,
        default: Date.now
      },

    }],

    capitulos: [{

      titleChapter: {
        type: String,
      },
      authorsChapter: {

        type: String,
      },

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
      },
      ordem: {
        type: String,
      },

      createAt: {
        type: Date,
        default: Date.now
      },

    }],


  },

  {
    versionKey: false,
  }
);

module.exports = mongoose.model('GrupoPesquisa', GrupoPesquisaSchema);
