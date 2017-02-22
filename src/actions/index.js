import axios from "axios";
import type {StoryModel} from "../reducers/stories.reducer";
import {
  SET_STORY,
  ADD_STORY,
  SET_STORIES,
  FETCH_STORIES,
  SET_STORY_IDS,
  SET_COMMENT
} from "../reducers/stories.reducer";

export const PAGE_SIZE = 20;

const debounce = require('lodash/debounce');

const storyCache = JSON.parse(localStorage.getItem('hn_stories')) || {};

const persistStoryCache = debounce(() => localStorage.setItem('hn_stories', JSON.stringify(storyCache)), 1000);

export function fetchStory(storyID) {
  return function (dispatch, getState) {
    function setStory(story: StoryModel) {
      dispatch({type: SET_STORY, payload: story});

      if (story.kids instanceof Array && story.kids.length > 0) {
        story.kids.forEach(commentID => {
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json`)
            .then(res => dispatch({type: SET_COMMENT, payload: res.data}));
        });
      }
    }

    if (typeof storyCache[storyID] !== undefined) {
      setStory(storyCache[storyID]);
    } else {
      axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
        .then(res => setStory(res.data));
    }
  };
}

export function fetchStories(pageNum = 0) {
  pageNum = parseInt(pageNum, 10);
  return function (dispatch, getState) {
    const setStory = (story: StoryModel) => {
      storyCache[story.id] = story;
      persistStoryCache();
      dispatch({type: ADD_STORY, payload: story});
    };

    const fetchStoryDetails = ids => {
      let firstIndex = pageNum * PAGE_SIZE;
      let lastIndex = (pageNum + 1) * PAGE_SIZE;

      firstIndex = Math.max(0, Math.min(firstIndex, ids.length));
      lastIndex = Math.max(0, Math.min(lastIndex, ids.length));

      dispatch({type: SET_STORIES, firstIndex, lastIndex});

      ids.slice(firstIndex, lastIndex).forEach(storyID => {
        if (typeof storyCache[storyID] === 'undefined') {
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
            .then(res => setStory(res.data));
        } else {
          setStory(storyCache[storyID]);
        }
      });

      dispatch({type: FETCH_STORIES, isFinished: true});
    };

    dispatch({type: FETCH_STORIES, isFinished: false});

    let storyIDs = getState().stories.ids;

    if (storyIDs.length === 0) {
      axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
        .then(response => {
          dispatch({type: SET_STORY_IDS, payload: response.data});
          fetchStoryDetails(response.data);
        });
    } else {
      fetchStoryDetails(storyIDs);
    }
  };
}
