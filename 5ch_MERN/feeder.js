const RssFeedEmitter = require('rss-feed-emitter');
const feeder = new RssFeedEmitter({ skipFirstLoad: true });
const { getAllUrlsFromDB } = require('./app/controllers/blogsites/helpers/getAllUrlsFromDB')
const { getItem } = require('./app/middleware/db')
const { getItembyRSS } = require('./app/middleware/db')
const Blog = require('./app/models/blog');
const Blogsite = require('./app/models/blogsite');

const startFeeder = async () => {
  try {
    console.log("************************")
    console.log("Running Feeder")
    console.log("************************")

    const blogsiteUrls = await getAllUrlsFromDB();
    if(blogsiteUrls.length > 1){
      blogsiteUrls.forEach(url => {
        feedList.push(url.RSS);
      });
    } else if(blogsiteUrls.length == 1){
      feedList = blogsiteUrls[0]
    }
    if(blogsiteUrls.length != 0){
      feeder.add({
        url: feedList.RSS,
        refresh: 2000,  // Default refresh value is 60 seconds
      });
    }

  } catch (error) {
    console.log("*************************")
    console.log("Error Feeder")
  }
}

const addNewFeed = (rssUrl) => {
  console.log(rssUrl)
  // feeder.add({
  //   url: rssUrl,
  //   refresh: 2000,
  // });
}

const deleteFeed = (rssUrl) => {
  console.log(rssUrl)
  feeder.remove(rssUrl);
}

feeder.on('new-item', async function(item) {
  try {
    console.log('============');
    const blogsite = await getItembyRSS(item.link, Blogsite);
    console.log(blogsite)
    console.log('============');
    // var blog = new Blog();
    // blog.genre_id = blogsite.genre_id;
    // blog.blogsite_id = blogsite._id;
    // blog.title = item.title;
    // blog.link = item.link;
    // blog.blog_date = item.date;
    // blog.save();
  } catch (error) {
    console.log("*************************")
    console.log("Error get blogsite info in Feeder")
  }
})

feeder.on('error', console.error);

module.exports = { startFeeder, addNewFeed, deleteFeed };
