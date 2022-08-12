const { itemNotFound } = require('../utils')

/**
 * Gets item from database by RSS
 * @param {string} RSS - item RSS
 */
const getItemsForTotal = (flag = true, req = '', model = {}) => {
  return new Promise((resolve, reject) => {
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
    model.find(option).exec(async (err, items) => {
      try {
        resolve(items.length)
      } catch (error) {
        reject(error)
      }
    })
  })
}

module.exports = { getItemsForTotal }
