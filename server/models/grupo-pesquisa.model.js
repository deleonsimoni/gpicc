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
      minicurriculo: {
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

      title: {
        type: String,

      },

      date: {
        type: String,

      },

      link: {
        type: String,

      },

      details: {
        type: String,

      },

      pathS3: {
        type: String,
      },

      parceriaName: {
        type: String,

      },
      parceriaemail: {
        type: String,
      },

      parceriaorcid: {
        type: String
      },

      parcerialattes: {
        type: String,
      },

      parceriainstagram: {
        type: String,
      },

      parceriatwitter: {
        type: String,
      },

      parceriafacebook: {
        type: String,
      },
      parceriaminicurriculo: {
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



    pesquisas: [{

      icPesquisa: {
        type: String,
        required: true
      },

      icTipoPesquisa: {
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

      pathS3: {
        type: String,
      },

      createAt: {
        type: Date,
        default: Date.now
      },

    }],

    extensaoEnsino: [{

      title: {
        type: String,
        required: true
      },

      begin: {
        type: String,
        required: true
      },

      end: {
        type: String
      },

      resume: {
        type: String,
        required: true
      },

      financing: {
        type: String,
      },

      researchLink: {
        type: String,
      },
      pathS3: {
        type: String,
      },

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
      pathS3: {
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
      link: {
        type: String,
      },

      financing: {
        type: String,
      },

      periodic: {
        type: String,
      },

      pathS3: {
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
      editora: {
        type: String,
      },
      datePublish: {
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
      pathS3: {
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
