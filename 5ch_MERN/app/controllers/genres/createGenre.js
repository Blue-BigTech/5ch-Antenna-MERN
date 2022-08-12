const Genre = require('../../models/genre')
const { createItem } = require('../../middleware/db')
const { handleError } = require('../../middleware/utils')
const { matchedData } = require('express-validator')
const { genreExists } = require('./helpers')

/**
 * Create item function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
const createGenre = async (req, res) => {
  try {
    console.log(req.body.name)
    req = matchedData(req)
    const doesGenreExists = await genreExists(req.name)
    if (!doesGenreExists) {
      res.status(201).json({'result': true, 'data': await createItem(req, Genre)})
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { createGenre }
