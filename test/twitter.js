// Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
chai.use(chaiHttp);
// Added by Praveen Nayak to test the search endpoint url of twitter api to list tweets
describe('/Search Tweet', () => {
    it('it should GET all the tweet', (done) => {
        chai.request('http://localhost:3000/api').get('/search_tweet?account=Lookup&count=3').end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
// Added by Kunjan Malik to test post endpoint url of twitter api to post a tweet
describe('/POST Tweet', () => {
    it('it should POST the tweet', (done) => {
        let Tweet = {
            status: "Hello World again2234"
        }
        chai.request('http://localhost:3000/api').post('/post_tweet').send(Tweet).end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
// Added by Yadnyshree Savant to test post endpoint url of twitter api to delete a tweet
describe('/DELETE Tweet', () => {
    it('it should DELETE the tweet', (done) => {
        let Tweet = {
            id: "1312973854407491584"
        }
        chai.request('http://localhost:3000/api').post('/delete_tweet').send(Tweet).end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
