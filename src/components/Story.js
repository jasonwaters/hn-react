import React, {Component} from "react";
import "./Story.css";

export default class Story extends Component {
    createMarkup(value) {
        return {__html: value};
    }
    render() {
        return (
            <li className="Story">
                <a href={this.props.data.url}>{this.props.data.title}</a>
                <a className="comment" href={"https://news.ycombinator.com/item?id="+this.props.data.id}>Comments&raquo;</a>
                {this.props.data.text ? <p className="text" dangerouslySetInnerHTML={this.createMarkup(this.props.data.text)}></p> : void 0}
            </li>
        )
    }
}