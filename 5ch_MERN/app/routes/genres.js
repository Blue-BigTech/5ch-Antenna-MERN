const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
  session: false
})
const trimRequest = require('trim-request')

const { roleAuthorization } = require('../controllers/auth')

const {
  getAllGenres,
  getGenres,
  createGenre,
  getGenre,
  updateGenre,
  deleteGenre
} = require('../controllers/genres')

const {
  validateCreateGenre,
  validateGetGenre,
  validateUpdateGenre,
  validateDeleteGenre
} = require('../controllers/genres/validators')

/*
 * Genres routes
 */

/*
 * Get all items route
 */
router.get('/all', getAllGenres)

/*
 * Get items route
 */
router.get(
  '/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  getGenres
)

/*
 * Create new item route
 */
router.post(
  '/',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateCreateGenre,
  createGenre
)

/*
 * Get item route
 */
router.get(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateGetGenre,
  getGenre
)

/*
 * Update item route
 */
router.patch(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateUpdateGenre,
  updateGenre
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  requireAuth,
  roleAuthorization(['admin']),
  trimRequest.all,
  validateDeleteGenre,
  deleteGenre
)

module.exports = router
