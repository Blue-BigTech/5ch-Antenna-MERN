const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

const {
  getBlogsByGenre,
  getNewBlogs,
  getBlogsByBlogsite,
} = require('../controllers/blogs')
/*
 * Blogs routes
 */

 /*
 * Get items route
 */
router.get(
  '/',
  trimRequest.all,
  getNewBlogs
)

/*
 * Get items route
 */
router.get(
  '/genre/',
  trimRequest.all,
  getBlogsByGenre
)

/*
 * Get items by blogsiteId route
 */
router.get(
  '/blogsite/',
  trimRequest.all,
  getBlogsByBlogsite
)
/*
 * Get items route
 */
// router.get(
//   '/:id',
//   trimRequest.all,
//   getMoreBlogs
// )

module.exports = router
