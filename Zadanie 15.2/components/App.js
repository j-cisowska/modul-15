var baseUrl = 'http://api.giphy.com';
var apiKey = 'SAzDGE4fBdQnnF2zSqrQOTan02BuWT1c';



App = React.createClass({
    
	getInitialState() {
    return {
        loading: false,
        searchingText: '',
        gif: {}
    };
},
	
	
		handleSearch: function(searchingText) {
				this.setState({
				loading: true 
				});
				this.getGif(searchingText)
					.then(gif => this.setState({ //wywołanie
					loading: false, 
					gif: gif, 
					searchingText: searchingText
				})
				)
				.catch(error => console.error('Something is not right', Error)); //wywołanie
				},
				
				
			getGif: function(searchingText) {
				return new Promise(
				function (resolve, reject) {
                  let url = baseUrl + '/v1/gifs/random?api_key=' + apiKey + '&tag=' + searchingText;
                  const request = new XMLHttpRequest();
                  request.onload = function() {
                    if (this.status === 200) {
                        let data = JSON.parse(this.responseText).data;
                        var gif = {
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif); //dostajemy gifa
                    } else {
                        reject(new Error(this.statusText)); //dostajemy błąd
                      }
                    };
                    request.onerror = function () {
                        reject(new Error(
                            `XMLHttpRequest Error: ${this.statusText}`));
                        };
                    request.open('GET', url);
                    request.send();
                  }
                );
		},
				
	
	render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Are you looking for GIF's?</h1>
                <p>Find a gif at <a href='http://giphy.com'>giphy</a>. Press enter, to download more gifs.</p>
                <Search onSearch={this.handleSearch}/>
 
			<Gif 
			loading={this.state.loading}
			url={this.state.gif.url}
			sourceUrl={this.state.gif.sourceUrl}
			/>
          </div>
        );
    }
});

ReactDOM.render(<App/>, document.getElementById('app'));