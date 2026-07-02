const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    politicalParty: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
    },

    municipality: {
      type: String,
      required: true,
    },

    manifesto: {
      type: String,
      default: "",
    },

    photo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

candidateSchema.index({ municipality: 1 });

module.exports = mongoose.model("Candidate", candidateSchema);
