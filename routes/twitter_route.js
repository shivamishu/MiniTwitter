var OAuth = require("oauth"),
  oauth = new OAuth.OAuth(
    "https://api.twitter.com/oauth/request_token",
    "https://api.twitter.com/oauth/access_token",
    process.env.TWITTER_API_KEY,
    process.env.TWITTER_API_SECRET,
    "1.0A",
    null,
    "HMAC-SHA1"
  );

const search_endpoint = "https://api.twitter.com/1.1/search/tweets.json?q=from",
  post_endpoint = "https://api.twitter.com/1.1/statuses/update.json",
  delete_endpoint = "https://api.twitter.com/1.1/statuses/destroy/";

// Search tweets
exports.search = async function (req, res) {
  console.log("Searching Tweets");
  oauth.get(
    search_endpoint +
      encodeURIComponent(":" + req.query.account) +
      "&count=" +
      (req.query.count ? req.query.count : 3),
    process.env.USER_ACCESS_TOKEN,
    process.env.USER_ACCESS_SECRET,
    function (err, data, _result) {
      if (err) {
        console.log(err);
        throw new Error(err);
      } else {
        console.log(data);
      }
      res.send(data);
    }
  );
};

// Post a Tweet
exports.post = async function (req, res) {
  console.log("Posting a Tweet");
  oauth.post(
    post_endpoint,
    process.env.USER_ACCESS_TOKEN,
    process.env.USER_ACCESS_SECRET,
    req.body,
    "application/json",
    function (err, data, result) {
      if (err) {
        console.log(err);
        throw new Error(err);
      } else {
        console.log(data);
      }
      res.send(data);
    }
  );
};

//Delete a Tweet
exports.delete = async function (req, res) {
  console.log("Deleting a Tweet");
  console.log(delete_endpoint + req.body.id + ".json");
  oauth.post(
    delete_endpoint + req.body.id + ".json",
    process.env.USER_ACCESS_TOKEN,
    process.env.USER_ACCESS_SECRET,
    req.body,
    "application/json",
    function (err, data, result) {
      if (err) {
        console.log(err);
        res.sendStatus(err.statusCode);
      } else {
        console.log(data);
        res.send(data);
      }
    }
  );
};
