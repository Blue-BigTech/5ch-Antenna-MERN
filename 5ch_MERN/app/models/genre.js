const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const GenreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
GenreSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Genre', GenreSchema)
