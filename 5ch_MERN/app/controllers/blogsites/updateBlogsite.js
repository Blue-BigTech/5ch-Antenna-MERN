const Blogsite = require('../../models/blogsite')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { blogsiteExistsExcludingItself } = require('./helpers')
const { getHtmlparse } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateBlogsite = async (req, res) => {
  try {
    const blogsiteId = req.params.id;
    // const filetype = req.file.originalname.split('.').pop();
    const filename = req.file.filename;
    const RSS_INFO = await getHtmlparse(req.body.URL)
    console.log(RSS_INFO);
    req = matchedData(req)
    const id = await isIDGood(blogsiteId)
    const doesBlogsiteExists = await blogsiteExistsExcludingItself(id, req.URL)
    if (!doesBlogsiteExists) {
      req.RSS = RSS_INFO.RSS_link;
      req.title = RSS_INFO.title;
      req.image = filename;
      res.status(200).json(await updateItem(id, Blogsite, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateBlogsite }
