const Blogsite = require('../../models/blogsite')
const Blog = require('../../models/blog')
// const { createBlog } = require('../../middleware/db')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { blogsiteExists } = require('./helpers')
const { getHtmlparse } = require('./helpers')
const { addNewFeed } = require('../../../feeder')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createBlogsite = async (req, res) => {
  try {
    const filename = req.file.filename;
    const RSS_INFO = await getHtmlparse(req.body.URL)

    req = matchedData(req)
    const doesBlogsiteExists = await blogsiteExists(req.URL)
    if (!doesBlogsiteExists) {
      req.RSS = RSS_INFO.RSS_link;
      req.title = RSS_INFO.title;
      req.icon = RSS_INFO.icon;
      req.image = filename;
      const data = await createItem(req, Blogsite, RSS_INFO.arrRSSItems)
      addNewFeed(data.item.RSS);

      var blogsiteItem = data.item;
      
      var blogs = data.blogs;
      var genreId = data.genre_id;
      var blogsiteId = data.blogsite_id;
      blogs.forEach(item => {
        var blog = new Blog();
        blog.genre_id = genreId;
        blog.blogsite_id = blogsiteId;
        blog.title = item.title;
        blog.link = item.link;
        blog.blog_date = item.blog_date;
        if(blogsiteItem.blogs.length < 5) blogsiteItem.blogs.push({'blog_title': item.title, 'blog_link': item.link});
        blog.save();
      });
      blogsiteItem.save();

      res.status(201).json({'result': true, 'data': data.item})
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createBlogsite }
