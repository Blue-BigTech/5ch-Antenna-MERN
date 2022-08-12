const { validateCreateBlogsite } = require('./validateCreateBlogsite')
const { validateDeleteBlogsite } = require('./validateDeleteBlogsite')
const { validateGetBlogsite } = require('./validateGetBlogsite')
const { validateUpdateBlogsite } = require('./validateUpdateBlogsite')

module.exports = {
  validateCreateBlogsite,
  validateDeleteBlogsite,
  validateGetBlogsite,
  validateUpdateBlogsite
}
