const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

// Create Schema
const PostScheme = new Scheme({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: Scheme.Types.ObjectId,
        ref: users
      }
    }
  ],
  comments: [
    {
      user: {
        type: Scheme.Types.ObjectId,
        ref: users
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: DataCue,
        default: Date.now
      }
    }
  ],
  date: {
    type: DataCue,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("posts");
