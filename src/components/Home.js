import StoryList from "./StoryList";
import React, {Component} from "react";
import type {StoriesModel} from "../reducers/stories.reducer";
import {connect} from "react-redux";
import {fetchStories} from "../actions";
import {withRouter} from "react-router-dom";

class Home extends Component {
  props: {
    dispatch: Function,
    push: Function,
    match: {
      params: {
        pageNum: number
      }
    }
  } & StoriesModel;

  state: {
    pageNum: number
  };

  get pageNum() {
    return parseInt(this.props.match.params.pageNum, 10) || 0;
  }

  componentDidMount() {
    this.fetchStories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.pageNum !== this.props.match.params.pageNum) {
      this.fetchStories();
    }
  }

  fetchStories() {
    this.props.dispatch(fetchStories(this.pageNum));
  }

  switchPage(pageNum: number) {
    window.scrollTo(0, 0);
    this.props.push(`/stories/${pageNum}`);
  }

  handlePrev() {
    this.switchPage(this.pageNum - 1);
  }

  handleNext() {
    this.switchPage(this.pageNum + 1);
  }


  render() {
    return (
      <div>
        <StoryList className={this.props.loading ? "loading" : ''} stories={this.props.stories}
                   startIndex={this.props.firstIndex+1}/>
        {this.props.numPages > 0 ? <div>Page {this.pageNum + 1} of {this.props.numPages}</div> : void 0}
        <div className="controls">
          <button disabled={this.pageNum===0} onClick={() => this.handlePrev()}>Previous</button>
          <button disabled={this.pageNum===this.props.numPages-1} onClick={() => this.handleNext()}>Next</button>
          <span className="status">{this.props.loading ? 'loading...' : ''}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state.stories);
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {dispatch};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
