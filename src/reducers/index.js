// @flow
import {combineReducers} from "redux";
import {stories, story} from "./stories.reducer";

const hnApp = combineReducers({
    stories,
    story,
});

export default hnApp;