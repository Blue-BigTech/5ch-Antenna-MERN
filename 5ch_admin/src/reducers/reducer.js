import { combineReducers } from "redux";
import { reducerLogin } from "./login/reducer";
import { reducerGenre } from "./genre/reducer";
import { reducerBlogsite } from "./blogsite/reducer";
import { reducerBlog } from "./blog/reducer";

export default combineReducers({
    reducerLogin,
    reducerGenre,
    reducerBlogsite,
    reducerBlog,
});