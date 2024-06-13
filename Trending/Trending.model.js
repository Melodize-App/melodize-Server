const db = require("../db");
db.connect();

const { default: mongoose } = require("mongoose");

const trndingSongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
    user: {
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
  playCount: {
    type: Number,
    default: 0,

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

const songModel = mongoose.model("trndingSong", trndingSongSchema);
module.exports = songModel;


