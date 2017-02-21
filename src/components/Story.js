// @flow
import React, {Component} from "react";
import "./Story.css";
import type {StoryModel} from "../reducers/stories.reducer";

import {
    Link
} from 'react-router-dom'

export default class Story extends Component {
    props: {
        data: StoryModel,
    };

    render() {
        return (
            <li className="Story">
                <Link to={"/story/"+ this.props.data.id}>{this.props.data.title}</Link>
                {this.props.data.url ? <a className="comment" href={"https://news.ycombinator.com/item?id="+this.props.data.id}>Comments&raquo;</a> : void 0}
            </li>
        )
    }
}