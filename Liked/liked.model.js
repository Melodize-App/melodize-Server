const db = require("../db");
db.connect();

const { default: mongoose } = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
  video_id: {
    type: String,
    unique: true,
    required: true,
  },
  thumbnails: {
    type: String
  }
  ,
  isLiked: {
    type: Boolean,
    default: false,
    required: true,
  },
  
  likedStatus: {
    type: Boolean,
    default: false,
    required: true,
  },
  video_length: {
    type: String,
    required: false,
  }
  ,
  author: {
    type: String,
    required: false,
  }
});

const songModel = mongoose.model("song", songSchema);

module.exports = songModel;