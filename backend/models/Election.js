const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    municipality: {
      type: String,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Upcoming",
        "Active",
        "Closed",
      ],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

electionSchema.index({ status: 1 });
electionSchema.index({ createdAt: -1 });

module.exports =
  mongoose.model(
    "Election",
    electionSchema
  );