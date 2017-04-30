var router = require('express').Router();
var uservotes = require('../models/user.votes.model');
var utils = require('../utils/utils');



router.post('/', function(req, res) {

    // check for existing user vote for a video for the day
    uservotes.getvote(req.body.userId,req.body.videoId,utils.getCurrentDate()).then(function(userObject) {

        // no vote exists in the database for the video if the the response list length is 0
       if(userObject.length == 0){
         uservotes.insertVote(req.body.userId,req.body.videoId,new Date()).then(function(expenseData) {
          res.send({"hasVoted":false});
         });
       }else {
         res.send({"hasVoted":true});
       }
    }).catch(function(error) {
        console.log('Error fetching or inserting data'.error);
        res.sendStatus(500);
    });
});

module.exports = router;
