import { apiClient } from '../../apiClient'
import { notification } from 'antd';

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
          return notification.warning({
            message: `警告`,
            description: response.errors.msg,
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => {
        dispatch(fetchGenreFailure())
        return notification.error({
          message: `エラー`,
          description:
            'サーバーエラー！',
          placement: 'bottomRight',
        });
      })
  }
}

export const ADD_GENRE_REQUEST = 'ADD_GENRE_REQUEST'
function addGenreRequest() {
  return {
    type: ADD_GENRE_REQUEST,
  }
}

export const ADD_GENRE_SUCCESS = 'ADD_GENRE_SUCCESS'
function addGenreSuccess(genre) {
  return {
    type: ADD_GENRE_SUCCESS,
    genre
  }
}

export const ADD_GENRE_FAILURE = 'ADD_GENRE_FAILURE'
function addGenreFailure() {
  return {
    type: ADD_GENRE_FAILURE,
  }
}

export function actionAddGenre(name) {
  return function (dispatch) {
    dispatch(addGenreRequest())
    apiClient
      .AddGenre(name)
      .then((res) => {
        var response = res.data;
        if(response.result){
          dispatch(addGenreSuccess(response.data))
          return notification.success({
            message: `成功`,
            placement: 'bottomRight',
          });
        } else {
          dispatch(addGenreFailure())
          return notification.warn({
            message: `警告`,
            description: response.errors.msg,
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => {
        dispatch(addGenreFailure())
        return notification.error({
          message: `エラー`,
          description:
            'サーバーエラー！',
          placement: 'bottomRight',
        });
      })
  }
}
