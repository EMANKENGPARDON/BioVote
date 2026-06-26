const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },

    nationalId: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      default: "",
    },

    municipality: {
      type: String,
      required: true,
    },

    faceImage: {
      type: String,
      default: "",
    },

    hasVoted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Voter", voterSchema);
