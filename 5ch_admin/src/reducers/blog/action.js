import { apiClient } from '../../apiClient'
import { notification } from 'antd';

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

export function actionFetchBlogs(page, genreId) {
  return function (dispatch) {
    dispatch(fetchBlogRequest())
    apiClient
      .getBlogsByGenre(page*50, genreId)
      .then((res) => {
        var response = res.data;
        if(response.result){
          dispatch(fetchBlogSuccess(response.data, response.total))
        } else {
          dispatch(fetchBlogFailure())
          return notification.warning({
            message: `警告`,
            description: response.errors.msg,
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => {
        dispatch(fetchBlogFailure())
        return notification.error({
          message: `エラー`,
          description:
            'サーバーエラー！',
          placement: 'bottomRight',
        });
      })
  }
}