
var http = require('http');
var querystring = require('querystring');

var movieList = [{ title: '부기영화', director: '급소가격' }, { title: '부기영화', director: '여빛' }];

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'post') {
        addNewMovie(req, res);
    }// get이면 목록 출력 
    else {
        showList(req, res);
    }
});
server.listen(3000);


function showList(req, res){
    //get 방식 화면단 출력
    res.writeHeader(200, { 'Content-Type': 'text/html; charset=UTF-8' });   //status code, content-type 우선설정
    res.write('<html>');
    res.write('<meta charset="UTF-8">');
    res.write('<body>');

    res.write('<h3>Favorite Movie</h3>');
    res.write('<div><ul>');

    movieList.forEach(function (item) {
        res.write('<li>' + item.title + '(' + item.director + ')</li>');
    }, this);
    res.write('</ul></div>');

    res.write(
        '<form method="post" action="."><h4>새 영화 입력</h4>' +
        '<div><input type="text" name="title" placeholder="영화제목"></div>' +
        '<div><input type="text" name="director" placeholder="감독"></div>' +
        '<input type="submit" value="upload">' +
        '</form>'
        );
    res.write('</body>');
    res.write('</html>');
    res.end();
}

function addNewMovie(req,res){
    var body = '';
    req.on('data', function(chunk){
        body += chunk;
    });
    req.on('end', function(){ //데이터 다받아서 배열에 넣기
        //require('querystring'); 모듈 사용해서 json을 쪼개 배열에 넣어보자
        var data = querystring.parse(body); //data는 json객체
        var titledata = data.title;
        var directordata = data.director;

        //배열에 넣기(js의 자료구조는 stack);
        movieList.push({title : titledata, director : directordata});
        //res.end("success");

        res.statusCode = 302;
        res.setHeader('Location', '.'); //get 방식(화면 처리) : 재요청
        // redirect, location.href와 같다고 생각하면 된다
        res.end();
    });

}


