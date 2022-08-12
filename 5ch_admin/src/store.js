import { createStore } from "redux";
import rootReducer from "./reducers/reducer";

function configureStore(state = { rotating: true }) {
  return createStore(rootReducer, state);
}

export default configureStore;