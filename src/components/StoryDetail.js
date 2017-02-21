import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {fetchStory} from "../actions/index";
import type {StoryModel} from "../reducers/stories.reducer";
import "./StoryDetail.css";

class StoryDetail extends Component {
  props: {
    story:StoryModel,
    match: {
      params: {
        storyId: number;
      }
    }
  };

  componentDidMount() {
    this.props.dispatch(fetchStory(this.storyId));
  }

  get storyId() {
    return parseInt(this.props.match.params.storyId, 10);
  }

  createMarkup(value: string) {
    return {__html: value};
  }

  render() {
    return (
      <div>
        <h3><a href={this.props.story.url}>{this.props.story.title}</a></h3>
        {this.props.story.text ? <p className="text" dangerouslySetInnerHTML={this.createMarkup(this.props.story.text)}></p> : void 0}
        <ul>
          {this.props.story.comments.map(comment => <li key={comment.id} dangerouslySetInnerHTML={this.createMarkup(comment.text)}></li>)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return Object.assign({
    story: state.story
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {dispatch};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StoryDetail));
