const { buildErrObject } = require('../../../middleware/utils')
const got = require('got');
const Parser = require('rss-parser');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const isRSS = (node) => {
  // Return false if there is no title attribute.
  if(typeof node.title === 'undefined') { return false }

  return node.title.includes('RSS');
};
const isIcon = (node) => {
  // Return false if there is no title attribute.
  if(typeof node.rel === 'undefined') { return false }

  return node.rel.includes('icon');
};
/**
 * Checks if a blogsite already exists in database
 * @param {string} URL - URL of item
 */
const getHtmlparse = (URL = '') => {
  return new Promise((resolve, reject) => {
    got(URL).then(response => {
      const dom = new JSDOM(response.body);
      let siteTitle = dom.window.document.querySelector('title').textContent;
      let nodeList = [...dom.window.document.querySelectorAll('link')];
      let RSS_INFO = {
        'title': siteTitle,
        'RSS_link': '',
        'icon': '',
        'arrRSSItems': []
      };
      nodeList.filter(isRSS).forEach(node => {
        RSS_INFO.RSS_link = node.href;
      });
      nodeList.filter(isIcon).forEach(node => {
        RSS_INFO.icon = node.href;
      });

      let parser = new Parser();
      let arrRSSItems = [];
      (async () => {
        let feed = await parser.parseURL(RSS_INFO.RSS_link);
      
        feed.items.forEach((item) => {
          let objItem = {
            'title': item.title,
            'link': item.link,
            'blog_date': item.date
          }
          arrRSSItems.push(objItem);
        });
        RSS_INFO.arrRSSItems = arrRSSItems;

        resolve(RSS_INFO)
      })();
    }).catch(err => {
      return reject(buildErrObject(422, "This URL isn't exist"))
    });
  })
}

module.exports = { getHtmlparse }
