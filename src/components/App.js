import React, {Component} from "react";
import "./App.css";
import {connect} from "react-redux";
import StoryList from "./StoryList";
import {fetchStories} from "../actions";

class App extends Component {
    constructor(props) {
        super(props);
        props.dispatch(fetchStories());
        this.state ={
            pageNum: 0
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="App">
                <h3 onClick={() => this.switchPage(0)}>Hacker News</h3>
                <StoryList className={this.props.loading ? "loading" : ''} stories={this.props.stories} startIndex={this.props.firstIndex+1} />
                <div>Page {this.state.pageNum+1} of {this.props.numPages}</div>
                <div className="controls">
                    <button disabled={this.state.pageNum===0} onClick={() => this.handlePrev()}>Previous</button>
                    <button disabled={this.state.pageNum===this.props.numPages-1} onClick={() => this.handleNext()}>Next</button>
                    <span className="status">{this.props.loading ? 'loading...' : ''}</span>
                </div>
            </div>
        );
    }

    switchPage(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.props.dispatch(fetchStories(this.state.pageNum));
        });
    }

    handlePrev() {
        this.switchPage(this.state.pageNum-1);
    }

    handleNext() {
        this.switchPage(this.state.pageNum+1);
    }
}

const mapStateToProps = (state) => {
    return Object.assign({}, state.stories);
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {dispatch};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
