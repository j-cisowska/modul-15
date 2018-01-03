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
				this.getGif(searchingText).then(gif => this.setState({
					loading: false, 
					gif: gif, 
					searchingText: searchingText
				})
				)
				
				.catch(error => console.error(Błąd));
				/*this.getGif(searchingText, function(gif) {
				this.setState({ 
				loading: false, 
				gif: gif, 
				searchingText: searchingText 
				});
				}.bind(this));*/
				},
				
				
				    getGif: function(searchingText) {
          return new Promise(
              function (resolve, reject) {
                  let url = '/v1/gifs/random?api_key=' + apiKey + '&tag=' + searchingText;
                  let xhr = new XMLHttpRequest();
                  xhr.onload = function() {
                    if (this.status === 200) {
                        let data = JSON.parse(this.responseText).data;
                        var gif = {
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        };
                        resolve(gif);
                    } else {
                        reject(new Error(this.statusText));
                      }
                    };
                    xhr.onerror = function () {
                        reject(new Error(
                            `XMLHttpRequest Error: ${this.statusText}`));
                        };
                    xhr.open('GET', url);
                    xhr.send();
                  }
                );
},
				
				/*getGif: function(searchingText, callback) { 
					var url = baseUrl + '/v1/gifs/random?api_key=' + apiKey + '&tag=' + searchingText; 
					
					let xhr = new XMLHttpRequest(); 
					
					//xhr.open('GET', url);
					
					request.onload = function() {
					if (this.status === 200) {
					let data = JSON.parse(xhr.responseText).data;
					else {
						reject(new Error(this.statusText));
					}///
					var gif = { 
					url: data.fixed_width_downsampled_url,
					sourceUrl: data.url
					};
						callback(gif); 
					}
				};
    xhr.send();
},*/
	

	
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