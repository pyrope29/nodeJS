
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.listen(3000);


var morgan = require('morgan'); //log 정보 확인
app.use(morgan('dev'));         //req, res 정보 log로 출력



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//내부적으로 true 하면 qs 모듈을 사용하고, false면 query-string 모듈을 사용

app.post('/', function (req, res) {
    var title = req.body.title;
    var message = req.body.message;   
    
    res.send('title : ' + title + ' message : ' + message);
     
});