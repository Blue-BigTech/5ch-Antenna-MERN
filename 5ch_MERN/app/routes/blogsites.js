const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const { roleAuthorization } = require('../controllers/auth')

const {
  getAllBlogsites,
  getBlogsites,
  getBlogsitesByGenre,
  createBlogsite,
  getBlogsite,
  updateBlogsite,
  deleteBlogsite
} = require('../controllers/blogsites')

const {
  validateCreateBlogsite,
  validateGetBlogsite,
  validateUpdateBlogsite,
  validateDeleteBlogsite
} = require('../controllers/blogsites/validators')

/*
 * File upload
 */
const storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/data/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const maxSize = 2 * 1024 * 1024;
const upload = multer({ 
  storage : storage,
  limits: { fileSize: maxSize }
});

/*
 * Blogsites routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllBlogsites)

/*
 * Get items route
 */
router.get(
  '/',
  trimRequest.all,
  getBlogsites
)
/*
 * Get items route
 */
router.get(
  '/genre/',
  trimRequest.all,
  getBlogsitesByGenre
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  upload.single('image'),
  validateCreateBlogsite,
  createBlogsite
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateGetBlogsite,
  getBlogsite
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  upload.single('image'),
  validateUpdateBlogsite,
  updateBlogsite
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateDeleteBlogsite,
  deleteBlogsite
)

module.exports = router
