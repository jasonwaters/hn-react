import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Story from './components/story.component';

const PAGE_SIZE = 30;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storyStartIdx: 0,
            storyIDs: [],
            stories: []
        };
    }

    componentDidMount() {
        //https://github.com/HackerNews/API
        axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
            .then(response => {
                let storyIDs = response.data;
                this.setState({storyIDs});
                this.loadStories();
            });
    }

    loadStories() {
        let start = this.state.storyStartIdx;
        let end = Math.min(this.state.storyIDs.length, start + PAGE_SIZE);
        if(start === this.state.storyIDs.length) return;

        this.state.storyIDs.slice(start, end)
            .forEach(storyID => {
                axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
                    .then(story => {
                        this.setState({
                            stories: this.state.stories.concat(story.data)
                        });
                    });
            });

        this.setState({storyStartIdx: end});
    }

    render() {
        return (
            <div className="App">
                <h3>Hacker News</h3>
                <ol>
                    {this.state.stories.map(story => <Story key={story.id} data={story} />)}
                </ol>
                <p>{this.state.storyStartIdx} / {this.state.storyIDs.length}</p>
                <button onClick={this.loadStories.bind(this)}>more</button>
            </div>
        );
    }
}

export default App;
