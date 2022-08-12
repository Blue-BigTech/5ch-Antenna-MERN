const { validateCreateGenre } = require('./validateCreateGenre')
const { validateDeleteGenre } = require('./validateDeleteGenre')
const { validateGetGenre } = require('./validateGetGenre')
const { validateUpdateGenre } = require('./validateUpdateGenre')

module.exports = {
  validateCreateGenre,
  validateDeleteGenre,
  validateGetGenre,
  validateUpdateGenre
}
