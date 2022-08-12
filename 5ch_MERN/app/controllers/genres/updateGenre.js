const Genre = require('../../models/genre')
const { updateItem } = require('../../middleware/db')
const { isIDGood, handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { genreExistsExcludingItself } = require('./helpers')

/**
 * Update item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const updateGenre = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await isIDGood(req.id)
    const doesGenreExists = await genreExistsExcludingItself(id, req.name)
    if (!doesGenreExists) {
      res.status(200).json(await updateItem(id, Genre, req))
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { updateGenre }
