import React, {Component} from "react";
import Story from './Story';
import "./StoryList.css";


export default class StoryList extends Component {
    render() {
        return (
            <ol className={`StoryList ${this.props.className}`} start={this.props.startIndex}>
                {this.props.stories.map(story => <Story key={story.id} data={story} />)}
            </ol>
        )
    }
}