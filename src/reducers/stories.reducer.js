// @flow
import {PAGE_SIZE} from "../actions/index";

export type StoryModel = {
  by: string,
  descendants: number,
  id: number,
  score: number,
  text?: string,
  time: number,
  title: string,
  type: string,
  url?: string,
}

export type StoriesModel = {
  loading: boolean,
  stories: StoryModel[],
  ids: number[],
  numPages: number,
  firstIndex: number,
  lastIndex: number,
}

type Action = {
  type: string,
  stories?:StoriesModel,
  firstIndex?:number,
  lastIndex?:number,
  isFinished:boolean,
  numPages:number,
  payload:any,
};

const STORY_DEFAULT: StoryModel = {
  id: 0,
  by: '',
  descendants: 0,
  score: 0,
  time: 0,
  title: "",
  type: "",
};

const STORIES_DEFAULT: StoriesModel = {
  loading: false,
  stories: [],
  ids: [],
  numPages: 0,
  firstIndex: 0,
  lastIndex: 0
};

export const SET_STORY = 'SET_STORY',
  SET_STORIES = 'SET_STORIES',
  FETCH_STORIES = 'FETCH_STORIES',
  SET_STORY_IDS = 'SET_STORY_IDS';

export function story(state: StoryModel = STORY_DEFAULT, action: Action) {
  switch (action.type) {
    case SET_STORY:
      return action.payload;
    default:
      return state;
  }
}

export function stories(state: StoriesModel = STORIES_DEFAULT, action: Action) {
  switch (action.type) {
    case SET_STORIES:
      return Object.assign({}, state, {
        stories: action.stories,
        firstIndex: action.firstIndex,
        lastIndex: action.lastIndex
      });
    case FETCH_STORIES:
      return Object.assign({}, state, {
        loading: !action.isFinished,
      });
    case SET_STORY_IDS:
      return Object.assign({}, state, {
        ids: [...action.payload],
        numPages: Math.ceil(action.payload.length / PAGE_SIZE)
      });
    default:
      return state;
  }
}
