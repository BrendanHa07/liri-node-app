// Storing all the keys in variables
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter')

var omdb = process.env.OMDB_API_KEY

var spotifyAPI = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});


var twitterAPI = new Twitter ({
	consumer_key:process.env.TWITTER_CONSUMER_KEY,
	consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
	access_token_key:process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret:process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var fs = require("fs");

var action = process.argv[2];
var input = process.argv[3];

// Put all actions into a switch statement

switch(action) {
	case "my-tweets":
	showTweets();
	break;

	case "spotify-this-song":
	spotifyThis();
	break;

	case "movie-this":
	showMovie();
	break;

	case "do-what-it-says":
	doit();
	break;
};

// Twitter function
function showTweets() {
	var params = {screen_name: "Brendanhahaha"};
	twitterAPI.get("statuses/user_timeline", params, function (error, tweets, response) {
		if (error) {
			console.log(error)
		}
		else { console.log("success");
			for (var i=0; i<tweets.length; i++) {
				var date = tweets[i].created_at;
				console.log("@Brendanhahaha " + tweets[i].text + "created at " + date.substring(0, 19));
				console.log("-----------------------");

				// Add text to log file
				fs.appendFile("log.txt", "-------------My Tweets----------------")
				fs.appendFile("log.txt", "@Brendanhahaha: " + tweets[i].text + "created at " + data.substring(0, 19));
				fs.appendFile("log.txt", "-------------My Tweets----------------")
			}
		}	
	});
};


// Spotify function
function spotifyThis() {
	var mySong = process.argv[3];
	spotifyAPI.search({ type: 'track', query: mySong}, function (error, data) {
		if (error) {
			console.log(error);
		} else {
				console.log('Artist Name: ' + data.tracks.items[0].artists[0].name);
				console.log('Song Name: ' + data.tracks.items[0].name);
				console.log('Preview Link: ' + data.tracks.items[0].preview_url);
				console.log('Album Title: ' + data.tracks.items[0].album.name);

				// Add text to log file
				fs.appendFile("log.txt", "-------------Music Info----------------")
				fs.appendFile("log.txt", 'Artist Name: ' + data.tracks.items[0].artists[0].name);
				fs.appendFile("log.txt", 'Song Name: ' + data.tracks.items[0].name);
				fs.appendFile("log.txt", 'Preview Link: ' + data.tracks.items[0].preview_url);
				fs.appendFile("log.txt", 'Album Title: ' + data.tracks.items[0].album.name);
				fs.appendFile("log.txt", "-------------Music Info----------------")

			}
		
	});
};




// showMovie function
function showMovie(movie) {
	var movie = process.argv[3]
	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&plot=short&tomatoes=true&R=json" + "&apikey=" + omdb;
	request(queryURL, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			var body = JSON.parse(body);

			console.log("Title: " + body.Title);
			console.log("Release Year: " + body.Year);
			console.log("IMDB Rating: " + body.imdbRating);
			console.log("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
			console.log("Production Country: " + body.Country);
			console.log("Language: " + body.Language);
			console.log("Plot: " + body.Plot);
			console.log("Actors: " + body.Actors);


			// Adds text to log.txt
			fs.appendFile("log.txt", "-------------Movie Info----------------")
			fs.appendFile("log.txt", "Title: " + body.Title);
			fs.appendFile("log.txt", "Release Year: " + body.Year);
			fs.appendFile("log.txt", "IMDB Rating: " + body.imdbRating);
			fs.appendFile("log.txt", "Rotten Tomatoes Rating: " + body.Ratings[1].Value);
			fs.appendFile("log.txt", "Production Country: " + body.Country);
			fs.appendFile("log.txt", "Language: " + body.Language);
			fs.appendFile("log.txt", "Plot: " + body.Plot);
			fs.appendFile("log.txt", "Actors: " + body.Actors);
			fs.appendFile("log.txt", "-------------Movie Info----------------")
		} else if (movie.length === 0) {
			console.log("You should check out 'Mr. Nobody!'");
		}

	});

}; 



// Do it function

