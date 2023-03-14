const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: String,
  surname: String,
  bio: String,
  created_time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("author", AuthorSchema);
