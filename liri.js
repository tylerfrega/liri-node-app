var keys = require('./keys.js');
var command = process.argv[2];
var search = process.argv[3];

switch(command){
    case 'my-tweets':
      getTweets();
      break;
    case 'spotify-this-song':
      searchSpotify();
      break;
    case 'movie-this':
      searchOMDB();
    break;


}

function getTweets(){
    var Twitter = require('twitter');
    var client = new Twitter(keys.twitterKeys); 
    var params = {screen_name: 'throwaway730'};
    
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for(i=0; i<tweets.length; i++){
        console.log(tweets[i].created_at, tweets[i].text);
        }
  }else{
      console.log(error);
  }
 });
};


function searchSpotify(){
    var Spotify = require('node-spotify-api');
    var client = new Spotify(keys.spotifyKeys);

    client.search({ type: 'track', query: search }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

 for(i=0; i<data.tracks.items.length; i++){

    var artist = data.tracks.items[i].artists[0].name;
    var songName = data.tracks.items[i].name;
    var preview_url = data.tracks.items[i].preview_url;
    var albumName = data.tracks.items[i].album.name
    
    console.log(artist + ': ',songName + '\n','Preview: ' + preview_url +'\n', 'Album: ' + albumName +'\n');
  } 
  
});
}


function searchOMDB(){
    var request = require("request");
    var movieName = search;
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


    request(queryUrl, function(error, response, body){
        var title = JSON.parse(body).Title;
        var year = JSON.parse(body).Year;
        var imdbRating = JSON.parse(body).Ratings.imdbRating;
        var country = JSON.parse(body).Country;
        var language = JSON.parse(body).Language;
        var plot = JSON.parse(body).Plot;
        var actors = JSON.parse(body).Actors;
        
        if(!error && response.statusCose === 200);{
           // console.log(title, year, imdbRating, country, language, plot, actors);
           console.log(title, "\n" + year, "\n" + imdbRating, "\n" + country,"\n" + language,"\n" + plot,"\n" + actors);
        }
        if(movieName === undefined){
            movieName = 'Mr.Nobody';
            console.log(title, year, imdbRating, country, language, plot, actors);

        }
    });
}


    
