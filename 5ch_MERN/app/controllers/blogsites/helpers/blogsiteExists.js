const Blogsite = require('../../../models/blogsite')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a blogsite already exists in database
 * @param {string} name - name of item
 */
const blogsiteExists = (blogsite = '') => {
  return new Promise((resolve, reject) => {
    Blogsite.findOne(
      {
        blogsite
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'URL_ALREADY_EXISTS'))
        }
        resolve(false)
      }
    )
  })
}

module.exports = { blogsiteExists }
