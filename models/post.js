const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    postTime: {
      type: Date,
      required: true
    },
    modifyTime: {
      type: Date
    },
    modified: {
      type: Boolean,
      required: true
    }
  }
)

module.exports = mongoose.model('Post', postSchema)
