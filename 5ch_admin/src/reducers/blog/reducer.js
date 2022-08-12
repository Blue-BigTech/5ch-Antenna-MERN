import{ 
  FETCH_BLOG_REQUEST, 
  FETCH_BLOG_SUCCESS, 
  FETCH_BLOG_FAILURE,
} from './action'

const initialState = {
  loadingBlog: true,
  blogs: [],
  total: 0,
}

export function reducerBlog(state = initialState, action) {
  switch (action.type) {
    case FETCH_BLOG_REQUEST : {
      return Object.assign({}, state,{
        loadingBlog: true
      });
    }
    case FETCH_BLOG_SUCCESS : {
      return Object.assign({}, state,{
        loadingBlog: false,
        blogs: action.blogs,
        total: action.total,
      });
    }
    case FETCH_BLOG_FAILURE : {
      return Object.assign({}, state,{
        loadingBlog: false
      });
    }
    default: 
      return state;
  }
}

