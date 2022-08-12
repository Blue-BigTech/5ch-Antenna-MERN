const { genreExists } = require('./genreExists')
const { genreExistsExcludingItself } = require('./genreExistsExcludingItself')
const { getAllItemsFromDB } = require('./getAllItemsFromDB')

module.exports = {
  genreExists,
  genreExistsExcludingItself,
  getAllItemsFromDB
}
