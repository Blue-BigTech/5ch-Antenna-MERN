const { handleError } = require('../../middleware/utils')
const { getAllUrlsFromDB } = require('./helpers')

/**
 * Get all items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getAllBlogsiteUrls = async (req, res) => {
  try {
    res.status(200).json(await getAllUrlsFromDB())
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getAllBlogsiteUrls }
