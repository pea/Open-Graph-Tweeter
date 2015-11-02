var SearchBox = React.createClass({
    
    getInitialState: function() {
        return {
            data: [],
            urlInputClasses: 'url'
        };
    },

    handleURLChange: function (event) {

        var pattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
        
        if (pattern.test(event.target.value)) {
            this.setState({urlInputClasses: 'url loading'});
            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': config.csrf
                },
                url: 'fetch',
                method: 'POST',
                cache: false,
                data: {
                    url: event.target.value
                },
                dataType: 'json',
                success: function(data) {
                    
                    this.setState({resultsStyle: { display: 'block' }});
                    this.setState({data: data});
                    this.setState({text: data.description + ' ' + event.target.value}); 
                    
                    if(config.authenticated){
                        this.setState({tweetStyle: { display: 'inline-block' }});
                        this.setState({connectStyle: { display: 'none' }});
                    } else {
                        this.setState({connectStyle: { display: 'inline-block' }});
                        this.setState({tweetStyle: { display: 'none' }});
                    } 
            
                    this.setState({urlInputClasses: 'url'});
                    
                }.bind(this)
            });
        }

    },
    
    handleTextChange: function (event) {
        this.setState({text: event.target.value});  
    },
    
    sendTweet: function () {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': config.csrf
            },
            url: 'sendtweet',
            method: 'POST',
            data: {
                image: this.state.data.image,
                text: this.state.text
            },
            dataType: 'json',
            success: function(data) {
                
            }.bind(this)
        });
    },

    render: function () {
        return ( 
            <div className="container">
                <div className="intro">
                    Fetch and tweet Open Graph data of a web pages
                </div>
                <div className="search-box">
                    <input type="text" className={this.state.urlInputClasses} placeholder="Paste a URL here" onChange={this.handleURLChange} />
                </div >
                <div className="results" style={this.state.resultsStyle}>
                    <div className="grid gut10">
                        <div className="col perc30"><img src={this.state.data.image} /></div>
                        <div className="col perc70">
                            <textarea className="tweet-text" disabled={config.authenticated == false} onChange={this.handleTextChange} value={this.state.text}></textarea>
                            <div className="button primary tweet" style={this.state.tweetStyle} onClick={this.sendTweet}>Tweet</div> 
                            <a href="twitter/login" className="button primary connect" style={this.state.connectStyle}>Connect</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

ReactDOM.render( <SearchBox />,
    document.getElementById('wrapper')
);