const mongoose = require('mongoose');

const ChatAdminSchema = new mongoose.Schema({

  author: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
  },

  chat: [{
    publisher: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    },
    loved: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      required: true
    },
    createAt: {
      type: Date,
      default: Date.now
    },
  }],

  icReply: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now
  },


});


module.exports = mongoose.model('Chat', ChatAdminSchema);
