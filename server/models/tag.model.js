const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema(
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
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Tag', TagSchema);
