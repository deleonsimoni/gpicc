const mongoose = require('mongoose');

const ComunidadeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },

    createAt: {
      type: Date,
      default: Date.now
    },

    isAtiva: {
      type: Boolean,
      default: true
    },

    name: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },
    cor: {
      type: String,
    },

    owners: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],

    tags: [
      {
        type: String,
      }
    ],

    imagePathS3: {
      type: String,
    },

    subscribers: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }],

    posts:
      [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
          },
          createAt: {
            type: Date,
            default: Date.now
          },
          blockComment: {
            type: Boolean,
            default: false
          },
          title: {
            type: String
          },
          content: {
            type: String
          },
          chats:
            [
              {
                user: {
                  type: mongoose.Schema.Types.ObjectId,
                  required: true,
                  ref: 'User'
                },

                createAt: {
                  type: Date,
                  default: Date.now
                },
                message: {
                  type: String,
                }
              }
            ]
        }
      ]

  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Comunidade', ComunidadeSchema);
