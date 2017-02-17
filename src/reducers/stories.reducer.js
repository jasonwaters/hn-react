import {PAGE_SIZE} from "../actions/index";
const stories_model = {
    loading: false,
    stories: [],
    ids: [],
    numPages: 0,
    firstIndex: 0,
    lastIndex: 0
};

function story(state, action) {
    switch (action.type) {
        case 'ADD_STORY':
            return action.payload;
        default:
            return state;
    }
}

function stories(state = stories_model, action) {
    switch (action.type) {
        case 'SET_STORIES':
            return Object.assign({}, state, {
                stories: action.stories,
                firstIndex: action.firstIndex,
                lastIndex: action.lastIndex
            });
        case 'FETCH_STORIES':
            return Object.assign({}, state, {
                loading: !action.isFinished,
            });
        case 'SET_STORY_IDS':
            return Object.assign({}, state, {
                ids: [...action.payload],
                numPages: Math.ceil(action.payload.length / PAGE_SIZE)
            });
        default:
            return state;
    }
}

export default stories;