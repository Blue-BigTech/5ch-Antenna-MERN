const { itemNotFound } = require('../utils')

/**
 * Gets item from database by RSS
 * @param {string} RSS - item RSS
 */
const getItembyRSS = (RSS = '', model = {}) => {
  return new Promise((resolve, reject) => {
    model.find({ 'RSS' : RSS }, async (err, item) => {
      try {
        await itemNotFound(err, item, 'NOT_FOUND')
        resolve(item)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { getItembyRSS }
