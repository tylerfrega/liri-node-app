var keys = require('./keys.js');
var command = process.argv[2];
var search = process.argv[3];

switch(command){
    case 'my-tweets':
      getTweets();
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
}