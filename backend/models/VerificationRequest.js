const mongoose = require("mongoose");

const verificationRequestSchema = new mongoose.Schema(
  {
    voter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voter",
      required: true,
    },

    nationalId: {
      type: String,
      required: true,
    },

    registeredImage: {
      type: String,
      required: true,
    },

    liveImage: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    reviewedBy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

verificationRequestSchema.index({ nationalId: 1 });
verificationRequestSchema.index({ status: 1 });
verificationRequestSchema.index({ createdAt: -1 });

module.exports = mongoose.model(
  "VerificationRequest",
  verificationRequestSchema
);