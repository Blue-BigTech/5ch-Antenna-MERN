import axios from 'axios'
import useCookies from '@react-smart/react-cookie-service';
const baseUrl = 'http://localhost:3000'

export const apiClient = {

  // Genre Process
  getAllGenres() {
    return new Promise(function (resolve, reject) {
      axios
        .get(baseUrl + '/genres/all')
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },

  // Blogsite Process
  getBlogsitesByGenre(page, genreId) {
    return new Promise(function (resolve, reject) {
      axios
        .get(baseUrl + '/blogsites/genre', {
          params: {
            page,
            filter: genreId,
          }
        })
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },

  // Blogs Process
  getBlogsByGenre(page, genreId) {
    return new Promise(function (resolve, reject) {
      axios
        .get(baseUrl + '/blogs/genre', {
          params: {
            page: page,
            filter: genreId,
          }
        })
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },

  getBlogsByBlogsite(page, blogsiteId) {
    return new Promise(function (resolve, reject) {
      axios
        .get(baseUrl + '/blogs/blogsite', {
          params: {
            page: page,
            filter: blogsiteId,
          }
        })
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },

  getNewBlogs() {
    return new Promise(function (resolve, reject) {
      axios
        .get(baseUrl + '/blogs', {
          params: {
            page: 0,
            limit: 30,
            sort: 'blog_date'
          }
        })
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
}