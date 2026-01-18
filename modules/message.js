const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/msg");
const messageSchema = new mongoose.Schema(
  {
    roomId: String,
    username: String,
    message: String,
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
