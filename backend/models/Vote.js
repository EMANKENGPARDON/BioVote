const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    voterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voter",
      required: true,
    },

    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },

    municipality: {
      type: String,
      required: true,
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vote", voteSchema);
