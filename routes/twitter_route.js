var access_token = process.env.USER_ACCESS_TOKEN;
var access_secret = process.env.USER_ACCESS_SECRET;
var OAuth = require("oauth"),
    oauth = new OAuth.OAuth("https://api.twitter.com/oauth/request_token", "https://api.twitter.com/oauth/access_token", process.env.TWITTER_API_KEY, process.env.TWITTER_API_SECRET, "1.0A", null, "HMAC-SHA1");

const search_endpoint = "https://api.twitter.com/1.1/search/tweets.json?q=from",
    post_endpoint = "https://api.twitter.com/1.1/statuses/update.json",
    delete_endpoint = "https://api.twitter.com/1.1/statuses/destroy/";

// Added by Shivam Shrivastav for Calling the search endpoint url to get top 5 tweets for the authorised user account
exports.search = async function (req, res) {
    console.log("Searching Tweets");
    oauth.get(search_endpoint + encodeURIComponent(":" + req.query.account) + "&count=" + (
    req.query.count ? req.query.count : 3
), access_token, access_secret, function (err, data, _result) {
        if (err) {
            console.log(err);
            throw new Error(err);
        }
        res.send(data);
    });
};

// Added by Kunjan Malik for calling the post endpoint url to post a tweet on your account
exports.post = async function (req, res) {
    console.log("Posting a Tweet");
    oauth.post(post_endpoint, access_token, access_secret, req.body, "application/json", function (err, data, result) {
        if (err) {
            console.log(err);
            throw new Error(err);
        }
        res.send(data);
    });
};

// Added by Yadnyshree Savant for calling the post endpoint url to delete a tweet from authorised account
exports.delete = async function (req, res) {
    console.log("Deleting a Tweet");
    console.log(delete_endpoint + req.body.id + ".json");
    oauth.post(delete_endpoint + req.body.id + ".json", access_token, access_secret, req.body, "application/json", function (err, data, result) {
        if (err) {
            console.log(err);
            res.sendStatus(err.statusCode);
        } else {

            res.send(data);
        }
    });
};
