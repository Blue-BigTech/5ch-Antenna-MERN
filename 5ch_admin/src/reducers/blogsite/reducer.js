import{ 
  FETCH_BLOGSITE_REQUEST, 
  FETCH_BLOGSITE_SUCCESS, 
  FETCH_BLOGSITE_FAILURE,
  ADD_BLOGSITE_REQUEST,
  ADD_BLOGSITE_SUCCESS,
  ADD_BLOGSITE_FAILURE,
  DELETE_BLOGSITE_REQUEST,
  DELETE_BLOGSITE_SUCCESS,
  DELETE_BLOGSITE_FAILURE,
} from './action'

const initialState = {
  loadingBlogsite: true,
  blogsites: [],
}

export function reducerBlogsite(state = initialState, action) {
  switch (action.type) {
    case FETCH_BLOGSITE_REQUEST : {
      return Object.assign({}, state,{
        loadingBlogsite: true
      });
    }
    case FETCH_BLOGSITE_SUCCESS : {
      return Object.assign({}, state,{
        loadingBlogsite: false,
        blogsites: action.blogsites
      });
    }
    case FETCH_BLOGSITE_FAILURE : {
      return Object.assign({}, state,{
        loadingBlogsite: false
      });
    }
    case ADD_BLOGSITE_REQUEST : {
      return Object.assign({}, state,{
        loadingBlogsite: true,
        blogsites: state.blogsites
      });
    }
    case ADD_BLOGSITE_SUCCESS : {
      return Object.assign({}, state,{
        loadingBlogsite: false,
        blogsites: state.blogsites.length!==0
                    ?
                    state.blogsites[0].genre_id===action.blogsite.genre_id
                    ?[...state.blogsites, action.blogsite]
                    :state.blogsites
                    :[...state.blogsites, action.blogsite]
      });
    }
    case ADD_BLOGSITE_FAILURE : {
      return Object.assign({}, state,{
        loadingBlogsite: false,
        blogsites: state.blogsites
      });
    }
    case DELETE_BLOGSITE_REQUEST : {
      return Object.assign({}, state,{
        loadingBlogsite: true,
        blogsites: state.blogsites
      });
    }
    case DELETE_BLOGSITE_SUCCESS : {
      return Object.assign({}, state,{
        loadingBlogsite: false,
        blogsites: state.blogsites.filter((blogsite) => (
          blogsite._id !== action.blogsiteId
        ))
      });
    }
    case DELETE_BLOGSITE_FAILURE : {
      return Object.assign({}, state,{
        loadingBlogsite: false,
        blogsites: state.blogsites
      });
    }
    default: 
      return state;
  }
}

