// @flow
import React, {Component} from "react";
import Story from "./Story";
import "./StoryList.css";
import type {StoryModel} from "../reducers/stories.reducer";


export default class StoryList extends Component {
  props: {
    stories: StoryModel[],
    startIndex: number,
    className: string,
  };

  render() {
    return (
      <ol className={`StoryList ${this.props.className}`} start={this.props.startIndex}>
        {this.props.stories.map(story => <Story key={story.id} data={story}/>)}
      </ol>
    )
  }
}
