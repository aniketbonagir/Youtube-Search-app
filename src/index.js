import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';

import YTSearch from 'youtube-api-search';
const YT_ApiKey = "#API_KEY";

class App extends Component{
    constructor(props){
        super(props);

        this.state = {
            videos:[],
            SelectedVideo:null
        };

        this.videoSearch('Discovery');

    }

    videoSearch(term){
        console.log("YT search last term-->"+term);
        YTSearch({key:YT_ApiKey,term:term}, (videos) => {
            this.setState({
                videos:videos,
                SelectedVideo:videos[0]
            });
            //this.setState({videos:videos});
        });
    }

    render(){
        const videoSearch = _.debounce((term)=>{this.videoSearch(term)},300);
        return (
            <div>
                <SearchBar onSearchTermChange = {videoSearch}/>
                <VideoDetail video={this.state.SelectedVideo}/>
                <VideoList
                    onVideoSelect = {SelectedVideo => this.setState({SelectedVideo})}
                    videos={ this.state.videos} />
            </div>
        );
    }


}

ReactDOM.render(<App/>,document.querySelector('.container'));