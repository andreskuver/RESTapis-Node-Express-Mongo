const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", Post);
