const { matchedData } = require('express-validator')
const Blogsite = require('../../models/blogsite')
const { getItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')

/**
 * Get item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const getBlogsite = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    res.status(200).json(await getItem(id, Blogsite))
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { getBlogsite }
