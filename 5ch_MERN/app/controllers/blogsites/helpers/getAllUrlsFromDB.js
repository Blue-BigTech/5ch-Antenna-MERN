const Blogsite = require('../../../models/blogsite')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Gets all items from database
 */
const getAllUrlsFromDB = () => {
  return new Promise((resolve, reject) => {
    Blogsite.find(
      {},
      '-updatedAt -createdAt',
      (err, items) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }
        resolve(items)
      }
    )
  })
}

module.exports = { getAllUrlsFromDB }
