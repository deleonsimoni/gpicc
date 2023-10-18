const mongoose = require('mongoose');

const GaleriaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    createAt: {
      type: Date,
      default: Date.now
    },

    imagePathS3: {
      type: String,
      required: true
    },

  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Galeria', GaleriaSchema);
