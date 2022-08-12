const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const BlogsiteSchema = new mongoose.Schema(
  {
    genre_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
      required: true
    },
    URL: {
      type: String,
      required: true
    },
    RSS: {
      type: String,
    },
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    image: {
      type: String,
      required: true
    },
    blogs: {
      type: Array,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
BlogsiteSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Blogsite', BlogsiteSchema)
