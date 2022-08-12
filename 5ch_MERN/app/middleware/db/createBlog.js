const { buildErrObject } = require('../utils')
const mongoose = require('mongoose');

/**
 * Creates a new item in database
 * @param {Object} data - blog data object
 */
const createBlog = (data = {}, Blog = {}) => {
  return new Promise((resolve, reject) => {

    // feeder.add({
    //   url: 'http://world-fusigi.net/index.rdf',
    //   refresh: 2000,  // Default refresh value is 60 seconds
    //   eventName: 'onFeeder'
    // });

    // feeder.on('onFeeder', function(item) {
    //   console.log(item);
    // })

    // feeder.on('error', console.error)

    model.create(req, (err, item) => {
      if (err) {
        reject(buildErrObject(422, err.message))
      }
      resolve(item)
    })
  })
}

module.exports = { createBlog }
