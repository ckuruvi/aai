var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var uservotes = require('./routes/user.votes');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/uservotes', uservotes);


app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
    console.log('Listening on port', server.address().port);
});
