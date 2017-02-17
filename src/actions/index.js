import axios from 'axios';

export const PAGE_SIZE = 10;

export function fetchStories(pageNum=0) {
    return function (dispatch, getState) {
        const fetchStoryDetails = ids => {
            let firstIndex = pageNum*PAGE_SIZE;
            let lastIndex = (pageNum+1)*PAGE_SIZE;

            firstIndex = Math.max(0, Math.min(firstIndex, ids.length));
            lastIndex = Math.max(0, Math.min(lastIndex, ids.length));

            axios.all(ids.slice(firstIndex, lastIndex).map(storyID => axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)))
                .then(res => {
                    dispatch({type: 'SET_STORIES', stories: res.map(value => value.data), firstIndex, lastIndex});
                    dispatch({type: 'FETCH_STORIES', isFinished: true});
                });
        };

        dispatch({type: 'FETCH_STORIES', isFinished: false});

        let storyIDs = getState().stories.ids;

        if(storyIDs.length === 0) {
            axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
                .then(response => {
                    dispatch({type: 'SET_STORY_IDS', payload: response.data});
                    fetchStoryDetails(response.data);
                });
        }else {
            fetchStoryDetails(storyIDs);
        }
    };
}
