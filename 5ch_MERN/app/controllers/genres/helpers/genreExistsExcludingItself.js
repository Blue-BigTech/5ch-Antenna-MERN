const Genre = require('../../../models/genre')
const { buildErrObject } = require('../../../middleware/utils')

/**
 * Checks if a genre already exists excluding itself
 * @param {string} id - id of item
 * @param {string} name - name of item
 */
const genreExistsExcludingItself = (id = '', name = '') => {
  return new Promise((resolve, reject) => {
    Genre.findOne(
      {
        name,
        _id: {
          $ne: id
        }
      },
      (err, item) => {
        if (err) {
          return reject(buildErrObject(422, err.message))
        }

        if (item) {
          return reject(buildErrObject(422, 'CATEGORY_ALREADY_EXISTS'))
        }

        resolve(false)
      }
    )
  })
}

module.exports = { genreExistsExcludingItself }
