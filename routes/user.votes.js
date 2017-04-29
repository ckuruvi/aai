var router = require('express').Router();
var uservotes = require('../models/user.votes.model');
var utils = require('../utils/utils');



router.post('/', function(req, res) {
    console.log("formatted date form util function",utils.getCurrentDate());

    uservotes.getvote(req.body.userId,req.body.videoId,utils.getCurrentDate()).then(function(userObject) {

       console.log("userObject result",userObject,userObject.length);

       if(userObject.length == 0){
         uservotes.insertVote(req.body.userId,req.body.videoId,new Date()).then(function(expenseData) {

          // res.sendStatus(200);
          res.send({"hasVoted":false});
         });
       }else {
         console.log("resopnse changed to unauthorised");
         //res.sendStatus(406);
         res.send({"hasVoted":true});
       }

    }).catch(function(err) {
        console.log('Error fetching or inserting data');
        res.sendStatus(500);
    });


});

module.exports = router;
