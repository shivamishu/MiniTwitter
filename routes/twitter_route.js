
var config = require("../config");

 var Twit = require('twit');

 var T = new Twit(config);

// Search a tweet
exports.search = async function (req, res) {
  console.log("Running Search");
T.get('search/tweets', { q: 'hello world', count: 3 }, function(err, data, response) {

 	var tweet = data.statuses;
 	for(var i=0;i<tweet.length;i++){
 		console.log(tweet[i].text);
 	}
  
});

  res.send();
};

// Post a Tweet
exports.post = async function (req, res) {
  console.log("Creating a Tweet");

  T.post('statuses/update', { status: 'hello world from Mars!' }, function(err, data, response) {
  console.log(data)
});
  res.send();
};

//Delete a Tweet
exports.delete = async function (req, res) {
  console.log("Delete Tweet");

  T.post('statuses/destroy/:id', { id: '' }, function (err, data, response) {
  console.log(data)
});
  res.send();
};
