import{ 
    FETCH_BLOG_REQUEST, 
    FETCH_BLOG_SUCCESS, 
    FETCH_BLOG_FAILURE,
    FETCH_NEWBLOG_REQUEST, 
    FETCH_NEWBLOG_SUCCESS, 
    FETCH_NEWBLOG_FAILURE,
    FETCH_BLOGSITE_REQUEST, 
    FETCH_BLOGSITE_SUCCESS, 
    FETCH_BLOGSITE_FAILURE,
    FETCH_GENRE_REQUEST,
    FETCH_GENRE_SUCCESS,
    FETCH_GENRE_FAILURE,
    ACTIVE_SUCCESS
  } from './action'
  
  const initialState = {
    loadingBlog: true,
    loadingNewBlog: true,
    loadingBlogsite: true,
    blogsites: [],
    blogs: [],
    newBlogs: [],
    genres: [],
    total: 0,
    genreId: '',
    navIndex: 0
  }
  
  export function reducerHome(state = initialState, action) {
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
      case FETCH_NEWBLOG_REQUEST : {
        return Object.assign({}, state,{
          loadingNewBlog: true
        });
      }
      case FETCH_NEWBLOG_SUCCESS : {
        return Object.assign({}, state,{
          loadingNewBlog: false,
          newBlogs: action.newblogs,
        });
      }
      case FETCH_NEWBLOG_FAILURE : {
        return Object.assign({}, state,{
          loadingNewBlog: false
        });
      }
      case FETCH_BLOGSITE_REQUEST : {
        return Object.assign({}, state,{
          loadingBlogsite: true
        });
      }
      case FETCH_BLOGSITE_SUCCESS : {
        return Object.assign({}, state,{
          loadingBlogsite: false,
          blogsites: action.blogsites,
          total: action.total,
          genreId: action.genreId,
        });
      }
      case FETCH_BLOGSITE_FAILURE : {
        return Object.assign({}, state,{
          loadingBlogsite: false
        });
      }
      case FETCH_GENRE_REQUEST : {
        return Object.assign({}, state,{
          loadingBlog: true
        });
      }
      case FETCH_GENRE_SUCCESS : {
        return Object.assign({}, state,{
          loadingBlog: false,
          genres: action.genres,
        });
      }
      case FETCH_GENRE_FAILURE : {
        return Object.assign({}, state,{
          loadingBlog: false
        });
      }
      case ACTIVE_SUCCESS : {
        return Object.assign({}, state,{
          navIndex: action.index
        });
      }
      default: 
        return state;
    }
  }
  
  