import { apiClient } from '../../apiClient'
import { notification } from 'antd';

export const FETCH_BLOGSITE_REQUEST = 'FETCH_BLOGSITE_REQUEST'
function fetchBlogsiteRequest() {
  return {
    type: FETCH_BLOGSITE_REQUEST,
  }
}

export const FETCH_BLOGSITE_SUCCESS = 'FETCH_BLOGSITE_SUCCESS'
function fetchBlogsiteSuccess(blogsites) {
  return {
    type: FETCH_BLOGSITE_SUCCESS,
    blogsites
  }
}

export const FETCH_BLOGSITE_FAILURE = 'FETCH_BLOGSITE_FAILURE'
function fetchBlogsiteFailure() {
  return {
    type: FETCH_BLOGSITE_FAILURE,
  }
}

export function actionFetchBlogsites(genreId) {
  return function (dispatch) {
    dispatch(fetchBlogsiteRequest())
    apiClient
      .getBlogsiteByGenre(genreId)
      .then((res) => {
        var response = res.data;
        if(response.result){
          dispatch(fetchBlogsiteSuccess(response.data))
        } else {
          dispatch(fetchBlogsiteFailure())
          return notification.warning({
            message: `警告`,
            description: response.errors.msg,
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => {
        dispatch(fetchBlogsiteFailure())
        return notification.error({
          message: `エラー`,
          description:
            'サーバーエラー！',
          placement: 'bottomRight',
        });
      })
  }
}

export const ADD_BLOGSITE_REQUEST = 'ADD_BLOGSITE_REQUEST'
function addBlogsiteRequest() {
  return {
    type: ADD_BLOGSITE_REQUEST,
  }
}

export const ADD_BLOGSITE_SUCCESS = 'ADD_BLOGSITE_SUCCESS'
function addBlogsiteSuccess(blogsite) {
  return {
    type: ADD_BLOGSITE_SUCCESS,
    blogsite
  }
}

export const ADD_BLOGSITE_FAILURE = 'ADD_BLOGSITE_FAILURE'
function addBlogsiteFailure() {
  return {
    type: ADD_BLOGSITE_FAILURE,
  }
}

export function actionAddBlogsite(url, genre_id, image) {
  return function (dispatch) {
    dispatch(addBlogsiteRequest())
    apiClient
      .AddBlogsite(url, genre_id, image)
      .then((res) => {
        var response = res.data;
        if(response.result){
          dispatch(addBlogsiteSuccess(response.data))
          return notification.success({
            message: `成功`,
            placement: 'bottomRight',
          });
        } else {
          dispatch(addBlogsiteFailure())
          return notification.warning({
            message: `警告`,
            description: response.errors.msg,
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => {
        dispatch(addBlogsiteFailure())
        return notification.error({
          message: `エラー`,
          description:
            'サーバーエラー！',
          placement: 'bottomRight',
        });
      })
  }
}

export const DELETE_BLOGSITE_REQUEST = 'DELETE_BLOGSITE_REQUEST'
function deleteBlogsiteRequest() {
  return {
    type: DELETE_BLOGSITE_REQUEST,
  }
}

export const DELETE_BLOGSITE_SUCCESS = 'DELETE_BLOGSITE_SUCCESS'
function deleteBlogsiteSuccess(blogsiteId) {
  return {
    type: DELETE_BLOGSITE_SUCCESS,
    blogsiteId
  }
}

export const DELETE_BLOGSITE_FAILURE = 'DELETE_BLOGSITE_FAILURE'
function deleteBlogsiteFailure() {
  return {
    type: DELETE_BLOGSITE_FAILURE,
  }
}

export function actionDeleteBlogsite(blogsiteId) {
  return function (dispatch) {
    dispatch(deleteBlogsiteRequest())
    apiClient
      .DeleteBlogsite(blogsiteId)
      .then((res) => {
        var response = res.data;
        if(response.result){
          dispatch(deleteBlogsiteSuccess(blogsiteId))
          return notification.success({
            message: `成功`,
            placement: 'bottomRight',
          });
        } else {
          dispatch(deleteBlogsiteFailure())
          return notification.warning({
            message: `警告`,
            description: response.errors.msg,
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => {
        dispatch(deleteBlogsiteFailure())
        return notification.error({
          message: `エラー`,
          description:
            'サーバーエラー！',
          placement: 'bottomRight',
        });
      })
  }
}
