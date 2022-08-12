const { buildErrObject } = require('../../middleware/utils')

/**
 * Creates a new item in database
 * @param {Object} req - request object
 */
const createItem = (req = {}, model = {}, blogs = []) => {
  return new Promise((resolve, reject) => {
    model.create(req, (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      const data = {
        'item': item,
        'genre_id': item.genre_id,
        'blogsite_id': item._id,
        'blogs': blogs
      }
      resolve(data)
    })
  })
}

module.exports = { createItem }
