const Blogsite = require('../../models/blogsite')
const { checkQueryString, getItems } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')

/**
 * Get items function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBlogsites = async (req, res) => {
  try {
    const query = await checkQueryString(req.query)
    res.status(200).json({'result': true, 'data': await getItems(req, Blogsite, query)})
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getBlogsites }
