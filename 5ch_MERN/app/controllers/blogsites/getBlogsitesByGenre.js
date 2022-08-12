const Blogsite = require('../../models/blogsite')
const { getItemsForTotal } = require('../../middleware/db')
const { getItemsByGenre } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBlogsitesByGenre = async (req, res) => {
  try {
    const totalCount = await getItemsForTotal(false, req, Blogsite)
    res.status(200).json({'result': true, 'data': await getItemsByGenre(false, req, Blogsite), 'total': totalCount})
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getBlogsitesByGenre }
