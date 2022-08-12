const { itemNotFound } = require('../utils')

/**
 * Gets item from database by RSS
 * @param {string} RSS - item RSS
 */
const getItemsByGenre = (flag = true, req = '', model = {}) => {
  var page = req.query.page;
  var option = {};
  if(flag){
    option = {
      'blogsite_id' : req.query.filter
    };
  } else {
    option = {
      'genre_id' : req.query.filter
    };
  }
  if(page === undefined){
    return new Promise((resolve, reject) => {
      model.find(option).populate({ path: 'blogsite_id', select: ['title', 'URL', 'icon'] }).exec(async (err, item) => {
        try {
          await itemNotFound(err, item, 'NOT_FOUND')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      })
    })
  } else {
    return new Promise((resolve, reject) => {
      model.find(option).populate({ path: 'blogsite_id', select: ['title', 'URL', 'icon'] }).skip(parseInt(page)).limit(50).exec(async (err, item) => {
        try {
          await itemNotFound(err, item, 'NOT_FOUND')
          resolve(item)
        } catch (error) {
          reject(error)
        }
      })
    })
  }
}

module.exports = { getItemsByGenre }
