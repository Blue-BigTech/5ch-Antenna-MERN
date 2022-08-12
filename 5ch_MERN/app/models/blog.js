const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const BlogSchema = new mongoose.Schema(
  {
    genre_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
      required: true
    }, 
    blogsite_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blogsite',
      required: true
    }, 
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    blog_date: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
BlogSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Blog', BlogSchema)
