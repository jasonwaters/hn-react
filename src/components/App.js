// @flow
import React, {Component} from "react";
import {
  Redirect,
  Route,
  Link
} from 'react-router-dom';

import "./App.css";
import Home from "./Home";
import StoryDetail from "./StoryDetail";

class App extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <h1><Link to="/">Hacker News</Link></h1>
        <Route exact path="/" render={() => <Redirect to="/stories"/>}/>
        <Route exact path="/stories" component={Home}/>
        <Route path="/stories/:pageNum" component={Home}/>
        <Route path="/story/:storyId" component={StoryDetail}/>
      </div>
    );
  }
}

export default App;
