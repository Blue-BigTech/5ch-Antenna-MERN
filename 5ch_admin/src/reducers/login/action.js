import { apiClient } from '../../apiClient'
import useCookies from '@react-smart/react-cookie-service';
import { notification } from 'antd';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  }
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE'
function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  }
}

export function ActionLogin(email, password) {
  const { setCookie } = useCookies();
  return function (dispatch) {
    dispatch(loginRequest())
    apiClient
      .login(email, password)
      .then((res) => {
        var response = res.data
        if(response.result){
          setCookie('token', response.data['access-token']);
          setCookie('user', response.data.user);
          setCookie('auth', true);
          dispatch(loginSuccess())
          return notification.success({
            message: `成功`,
            placement: 'bottomRight',
          });
        } else {
          dispatch(loginFailure())
          return notification.warning({
            message: `警告`,
            description: response.errors.msg,
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => {
        dispatch(loginFailure())
        return notification.error({
          message: `エラー`,
          description:
            'サーバーエラー！',
          placement: 'bottomRight',
        });
      })
  }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export function ActionLogout() {
  const { setCookie } = useCookies();
  return function (dispatch) {
    setCookie('token', '');
    setCookie('user', '');
    setCookie('auth', false);
    dispatch(logoutSuccess())
  }
}