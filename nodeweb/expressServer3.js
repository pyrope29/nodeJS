var express = require('express');
var app = express();

app.use(express.static(__dirname + '/images'));

app.use(function(req, res) {
 res.send('Hello Expresssssssssss');
});

app.listen(3000)