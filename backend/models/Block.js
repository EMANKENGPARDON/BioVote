const mongoose = require("mongoose");

const blockSchema =
  new mongoose.Schema(
    {
      index: Number,

      previousHash: String,

      voteHash: String,

      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

blockSchema.index({ index: -1 });

module.exports =
  mongoose.model(
    "Block",
    blockSchema
  );