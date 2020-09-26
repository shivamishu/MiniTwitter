require("dotenv").config();
var express = require("express");
var twitter_route = require("./routes/twitter_route");

// body parser added
var bodyParser = require("body-parser");
let cors = require("cors");
var app = express();
app.use(express.static(__dirname));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
// Allow cross origin requests
app.use(cors());
var router = express.Router();
// deafult
app.use("/api", router);

// test route
router.get("/", function (req, res) {
  console.log("default route called");
  res.json({
    message: "welcome to Twitter Service",
  });
});
// route to search tweets
router.get("/search_tweet", twitter_route.search);
// route to post tweet
router.post("/post_tweet", twitter_route.post);
// route to delete tweet
router.post("/delete_tweet", twitter_route.delete);

// port added
app.listen(process.env.PORT || 3000);
console.log("listening on port:" + (process.env.PORT || 3000));
