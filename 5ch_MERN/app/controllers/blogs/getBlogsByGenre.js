const Blog = require('../../models/blog')
const { getItemsByGenre } = require('../../middleware/db')
const { getItems } = require('../../middleware/db')
const { getItemsForTotal } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBlogsByGenre = async (req, res) => {
  try {
    const totalCount = await getItemsForTotal(false, req, Blog)
    res.status(200).json({'result': true, 'data': await getItemsByGenre(false, req, Blog), 'total': totalCount})
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getBlogsByGenre }
