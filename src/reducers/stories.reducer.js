// @flow
import {PAGE_SIZE} from "../actions/index";

export type CommentModel = {
  by: string,
  id: number,
  kids: number[],
  parent: number,
  text: string,
  time: number,
  type: string
}

export type StoryModel = {
  by: string,
  descendants: number,
  kids: number[],
  id: number,
  score: number,
  text?: string,
  time: number,
  title: string,
  type: string,
  url?: string,
  comments: CommentModel[]
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

const COMMENT_DEFAULT: CommentModel = {
  by: "",
  id: 0,
  kids: [],
  parent: 0,
  text: "",
  time: 0,
  type: ""
};

const STORY_DEFAULT: StoryModel = {
  id: 0,
  by: '',
  descendants: 0,
  kids: [],
  score: 0,
  time: 0,
  title: "",
  type: "",
  comments: []
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
  SET_COMMENT = 'SET_COMMENT',
  SET_COMMENTS = 'SET_COMMENTS',
  SET_STORIES = 'SET_STORIES',
  FETCH_STORIES = 'FETCH_STORIES',
  SET_STORY_IDS = 'SET_STORY_IDS';


function arrayOf(count:number, fn:Function) {
  let result = [];
  for(let i=0;i<count;i++) {
    result.push(fn(i));
  }
  return result;
}

export function story(state: StoryModel = STORY_DEFAULT, action: Action) {
  switch (action.type) {
    case SET_STORY:
      return Object.assign({}, state, action.payload, {
        comments: action.payload.kids instanceof Array && action.payload.kids.length ? arrayOf(action.payload.kids.length, idx => Object.assign({}, COMMENT_DEFAULT, {id:idx})) : []
      });
    case SET_COMMENTS:
      return Object.assign({}, state, {
        comments: action.payload
      });
    case SET_COMMENT:
      let commentIndex = state.kids.indexOf(action.payload.id);

      return Object.assign({}, state, {
        comments: [...state.comments.slice(0,commentIndex), action.payload, ...state.comments.slice(commentIndex+1)]
      });
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
