import axios from 'axios';

export const PAGE_SIZE = 20;

const storyCache = JSON.parse(localStorage.getItem('hn_stories')) || {};

export function fetchStory(storyID) {
    return function (dispatch, getState) {
        if (typeof storyCache[storyID] !== undefined) {
            dispatch({type: 'SET_STORY', payload: storyCache[storyID]});
        } else {
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
                .then(res => {
                    dispatch({type: 'SET_STORY', payload: res.data});
                });
        }
    };
}

export function fetchStories(pageNum = 0) {
    pageNum = parseInt(pageNum, 10);
    return function (dispatch, getState) {
        const fetchStoryDetails = ids => {
            let firstIndex = pageNum * PAGE_SIZE;
            let lastIndex = (pageNum + 1) * PAGE_SIZE;

            firstIndex = Math.max(0, Math.min(firstIndex, ids.length));
            lastIndex = Math.max(0, Math.min(lastIndex, ids.length));

            axios.all(ids.slice(firstIndex, lastIndex).map(storyID => {
                if (typeof storyCache[storyID] === 'undefined') {
                    return axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`);
                } else {
                    return new Promise(resolve => resolve({data: storyCache[storyID]}));
                }

            })).then(res => {
                let stories = res.map(value => {
                    storyCache[value.data.id] = value.data;
                    return value.data;
                });

                localStorage.setItem('hn_stories', JSON.stringify(storyCache));
                dispatch({type: 'SET_STORIES', stories, firstIndex, lastIndex});
                dispatch({type: 'FETCH_STORIES', isFinished: true});
            });
        };

        dispatch({type: 'FETCH_STORIES', isFinished: false});

        let storyIDs = getState().stories.ids;

        if (storyIDs.length === 0) {
            axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
                .then(response => {
                    dispatch({type: 'SET_STORY_IDS', payload: response.data});
                    fetchStoryDetails(response.data);
                });
        } else {
            fetchStoryDetails(storyIDs);
        }
    };
}
