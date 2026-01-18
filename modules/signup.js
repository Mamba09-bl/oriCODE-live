import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/msg");
const signupSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

export default mongoose.models.signup || mongoose.model("signup", signupSchema);
