import{ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from './action'

const initialState = {
  loadingLogin: true,
  loadingLogout: false,
}

export function reducerLogin(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST : {
      return Object.assign({}, state,{
        loadingLogin: true
      });
    }
    case LOGIN_SUCCESS : {
      return Object.assign({}, state,{
        loadingLogin: false
      });
    }
    case LOGIN_FAILURE : {
      return Object.assign({}, state,{
        loadingLogin: true
      });
    }
    case LOGOUT_SUCCESS : {
      return Object.assign({}, state,{
        loadingLogout: true
      });
    }
    default: 
      return state;
  }
}

