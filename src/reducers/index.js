import {combineReducers} from "redux";
import stories from './stories.reducer';

const hnApp = combineReducers({
    stories,
});

export default hnApp;