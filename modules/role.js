const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
    },

    hostUsername: {
      type: String,
      required: true,
    },

    editableUsers: {
      type: [String], // usernames who can edit
      default: [],
    },

    isLocked: {
      type: Boolean,
      default: false,
    },
    language: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Room", roomSchema);
