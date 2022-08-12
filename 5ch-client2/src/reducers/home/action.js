import { apiClient } from '../../apiClient'

export const FETCH_BLOG_REQUEST = 'FETCH_BLOG_REQUEST'
function fetchBlogRequest() {
  return {
    type: FETCH_BLOG_REQUEST,
  }
}

export const FETCH_BLOG_SUCCESS = 'FETCH_BLOG_SUCCESS'
function fetchBlogSuccess(blogs, total) {
  return {
    type: FETCH_BLOG_SUCCESS,
    blogs,
    total,
  }
}

export const FETCH_BLOG_FAILURE = 'FETCH_BLOG_FAILURE'
function fetchBlogFailure() {
  return {
    type: FETCH_BLOG_FAILURE,
  }
}

export function actionFetchBlogsByBlogsite(page, blogsiteId) {
  return function (dispatch) {
    dispatch(fetchBlogRequest())
    apiClient
      .getBlogsByBlogsite(page*50, blogsiteId)
      .then((res) => {
        var response = res.data;
        if(response.result){
          dispatch(fetchBlogSuccess(response.data, response.total))
        } else {
          dispatch(fetchBlogFailure())
        }
      })
      .catch((err) => {
        dispatch(fetchBlogFailure())
      })
  }
}

export const FETCH_NEWBLOG_REQUEST = 'FETCH_NEWBLOG_REQUEST'
function fetchNewBlogRequest() {
  return {
    type: FETCH_NEWBLOG_REQUEST,
  }
}

export const FETCH_NEWBLOG_SUCCESS = 'FETCH_NEWBLOG_SUCCESS'
function fetchNewBlogSuccess(newblogs) {
  return {
    type: FETCH_NEWBLOG_SUCCESS,
    newblogs,
  }
}

export const FETCH_NEWBLOG_FAILURE = 'FETCH_NEWBLOG_FAILURE'
function fetchNewBlogFailure() {
  return {
    type: FETCH_NEWBLOG_FAILURE,
  }
}

export function actionFetchNewBlogs() {
  return function (dispatch) {
    dispatch(fetchNewBlogRequest())
    apiClient
      .getNewBlogs()
      .then((res) => {
        var response = res.data;
        if(response.result){
          dispatch(fetchNewBlogSuccess(response.data.docs))
        } else {
          dispatch(fetchNewBlogFailure())
        }
      })
      .catch((err) => {
        dispatch(fetchNewBlogFailure())
      })
  }
}

export const FETCH_BLOGSITE_REQUEST = 'FETCH_BLOGSITE_REQUEST'
function fetchBlogsiteRequest() {
  return {
    type: FETCH_BLOGSITE_REQUEST,
  }
}

export const FETCH_BLOGSITE_SUCCESS = 'FETCH_BLOGSITE_SUCCESS'
function fetchBlogsiteSuccess(blogsites, total, genreId) {
  return {
    type: FETCH_BLOGSITE_SUCCESS,
    blogsites,
    total,
    genreId,
  }
}

export const FETCH_BLOGSITE_FAILURE = 'FETCH_BLOGSITE_FAILURE'
function fetchBlogsiteFailure() {
  return {
    type: FETCH_BLOGSITE_FAILURE,
  }
}

export function actionFetchBlogsites(page, genreId) {
  return function (dispatch) {
    dispatch(fetchBlogsiteRequest())
    apiClient
      .getBlogsitesByGenre(page*2, genreId)
      .then((res) => {
        var response = res.data;
        if(response.result){
          dispatch(fetchBlogsiteSuccess(response.data, response.total, genreId))
        } else {
          dispatch(fetchBlogsiteFailure())
        }
      })
      .catch((err) => {
        dispatch(fetchBlogsiteFailure())
      })
  }
}

export const FETCH_GENRE_REQUEST = 'FETCH_GENRE_REQUEST'
function fetchGenreRequest() {
  return {
    type: FETCH_GENRE_REQUEST,
  }
}

export const FETCH_GENRE_SUCCESS = 'FETCH_GENRE_SUCCESS'
function fetchGenreSuccess(genres) {
  return {
    type: FETCH_GENRE_SUCCESS,
    genres
  }
}

export const FETCH_GENRE_FAILURE = 'FETCH_GENRE_FAILURE'
function fetchGenreFailure() {
  return {
    type: FETCH_GENRE_FAILURE,
  }
}

export function actionFetchGenres() {
  return function (dispatch) {
    dispatch(fetchGenreRequest())
    apiClient
      .getAllGenres()
      .then((res) => {
        var response = res.data;
        if(response.result){
          dispatch(fetchGenreSuccess(response.data))
        } else {
          dispatch(fetchGenreFailure())
        }
      })
      .catch((err) => {
        dispatch(fetchGenreFailure())
      })
  }
}

export const ACTIVE_SUCCESS = 'ACTIVE_SUCCESS'
function activeSuccess(index) {
  return {
    type: ACTIVE_SUCCESS,
    index
  }
}

export function activeNav(index) {
  return function (dispatch) {
    dispatch(activeSuccess(index))
  }
}