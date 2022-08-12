const Blogsite = require('../../models/blogsite')
const Blog = require('../../models/blog')
const { matchedData } = require('express-validator')
const { isIDGood, handleError } = require('../../middleware/utils')
const { deleteItem } = require('../../middleware/db')
const { getItem } = require('../../middleware/db')
const { deleteFeed } = require('../../../feeder')

/**
 * Delete item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const deleteBlogsite = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const item = await getItem(id, Blogsite)
    const result = await deleteItem(id, Blogsite)
    deleteFeed(item.RSS);

    const query = { 'blogsite_id': id}
    const blogResult = await Blog.deleteMany(query)

    res.status(200).json({'result': true, 'data': result})
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { deleteBlogsite }
