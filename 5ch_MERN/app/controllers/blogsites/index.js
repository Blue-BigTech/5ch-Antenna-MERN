const { createBlogsite } = require('./createBlogsite')
const { deleteBlogsite } = require('./deleteBlogsite')
const { getAllBlogsites } = require('./getAllBlogsites')
const { getAllBlogsiteUrls } = require('./getAllBlogsiteUrls')
const { getBlogsite } = require('./getBlogsite')
const { getBlogsites } = require('./getBlogsites')
const { getBlogsitesByGenre } = require('./getBlogsitesByGenre')
const { updateBlogsite } = require('./updateBlogsite')

module.exports = {
  createBlogsite,
  deleteBlogsite,
  getAllBlogsites,
  getAllBlogsiteUrls,
  getBlogsite,
  getBlogsites,
  getBlogsitesByGenre,
  updateBlogsite
}
