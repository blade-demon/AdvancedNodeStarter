const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  githubId: String,
  displayName: String
});

mongoose.model("User", userSchema);
