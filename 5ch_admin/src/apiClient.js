import axios from 'axios'
import useCookies from '@react-smart/react-cookie-service';
const baseUrl = 'http://localhost:3000'

export const apiClient = {
  constructor() {
  },
  
  // Login Process
  login(email, password) {
    return new Promise(function (resolve, reject) {
      axios
        .post(baseUrl + '/login', {
          email,
          password,
        })
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },

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

  AddGenre(name) {
    const { getCookie } = useCookies();
    return new Promise(function (resolve, reject) {
      axios
        .post(baseUrl + '/genres', {
          name
        },{ 
          headers: {"Authorization" : `Bearer ${getCookie('token')}`} 
        })
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },

  // Blogsite Process
  getBlogsiteByGenre(genreId) {
    return new Promise(function (resolve, reject) {
      axios
        .get(baseUrl + '/blogsites/genre', {
          params: {
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

  AddBlogsite(url, genre_id, image) {
    const { getCookie } = useCookies();
    let formData = new FormData()
    formData.append("URL", url);
    formData.append("genre_id", genre_id);
    formData.append("image", image);

    return new Promise(function (resolve, reject) {
      axios
        .post(baseUrl + '/blogsites', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization" : `Bearer ${getCookie('token')}`
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

  DeleteBlogsite(blogsiteId) {
    const { getCookie } = useCookies();
    return new Promise(function (resolve, reject) {
      axios
        .delete(baseUrl + '/blogsites/' + blogsiteId,{ 
          headers: {"Authorization" : `Bearer ${getCookie('token')}`} 
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
}