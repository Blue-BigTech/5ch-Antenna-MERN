import{ 
  FETCH_GENRE_REQUEST, 
  FETCH_GENRE_SUCCESS, 
  FETCH_GENRE_FAILURE,
  ADD_GENRE_REQUEST,
  ADD_GENRE_SUCCESS,
  ADD_GENRE_FAILURE,
} from './action'

const initialState = {
  loadingGenre: true,
  genres: [],
}

export function reducerGenre(state = initialState, action) {
  switch (action.type) {
    case FETCH_GENRE_REQUEST : {
      return Object.assign({}, state,{
        loadingGenre: true
      });
    }
    case FETCH_GENRE_SUCCESS : {
      return Object.assign({}, state,{
        loadingGenre: false,
        genres: action.genres
      });
    }
    case FETCH_GENRE_FAILURE : {
      return Object.assign({}, state,{
        loadingGenre: false
      });
    }
    case ADD_GENRE_REQUEST : {
      return Object.assign({}, state,{
        loadingGenre: true,
      });
    }
    case ADD_GENRE_SUCCESS : {
      return Object.assign({}, state,{
        loadingGenre: false,
        genres: [...state.genres, action.genre]
      });
    }
    case ADD_GENRE_FAILURE : {
      return Object.assign({}, state,{
        loadingGenre: false,
        genres: state.genres
      });
    }
    default: 
      return state;
  }
}

