# TwitterAPI

Enterprize Software Platforms HW #2 Twitter Service  
Team: Cloud Bond

# Setup

Create your own User and Twitter API Key, Secret and Token.  
Create .env file in the root directory and maintain these credentials.

TWITTER_API_KEY=  
TWITTER_API_SECRET=  
USER_ACCESS_TOKEN=  
USER_ACCESS_SECRET=

run cmd commands:  
npm i --s  
node server.js

Server will be up on port localhost 3000

http://localhost:3000

# APIs

GET: Get Tweets for your Account  
http://localhost:3000/api/search_tweet?account=SampleDevAccess&count=3

POST: Post Tweets from your account  
http://localhost:3000/api/post_tweet  
body  
{"status": "Hi, There!, Whatsup?"}

POST: Delete one of the tweet from your account  
http://localhost:3000/api/delete_tweet

body  
{"id" :"1309885102650843136"}
