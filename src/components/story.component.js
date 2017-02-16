import React, {Component} from "react";

export default class Story extends Component {

    render() {
        return (
            <li className="story">
                <a href={this.props.data.url}>{this.props.data.title}</a>
                <span className="comment">
                    <a href={"https://news.ycombinator.com/item?id="+this.props.data.id}>Comments</a>
                </span>
            </li>
        )
    }
}


// {this.state.stories.map(story => <li className="story" key={story.id}><a href={story.url}>{story.title}</a><span className="comment"><a href={"https://news.ycombinator.com/item?id="+story.id}>Comments</a></span></li>)}
