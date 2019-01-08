var http = require('http');
var fs = require('fs');

var data = fs.readFileSync('./movieData.json');
var movieList = JSON.parse(data);

var server = http.createServer(function (req, res) {
    var method = req.method.toLowerCase();
    switch (method) {
        case 'get':
            // 영화 목록 보기 : /movies
            // 영화 상세 정보 보기 : /movies/1, /movies/2
            handleGetRequest(req, res);
            return;
        case 'post':
            // 영화 정보 추가 : /movies
            handlePostRequest(req, res);
            return;
        case 'put':
            // 영화 정보 수정 : /movies/1, /movies/2
            handlePutRequest(req, res);
            return;
        case 'delete':
            // 영화 정보 삭제 : /movies, /moives/1
            handleDeleteRequest(req, res);
            return;
        default:
            res.statusCode = 404;
            res.end('잘못된 요청입니다.');
            return;
    }
});
server.listen(3000);

function handleGetRequest(req, res) {
    var url = req.url;
    if (url == '/movies') {
        // 영화 목록 만들기
        var list = [];
        for (var i = 0; i < movieList.length; i++) {
            var movie = movieList[i];
            list.push({ id: movie.id, title: movie.title });
        }
        
        // 항목 갯수와 영화 목록 정보        
        var result = {
            count: list.length,
            data: list
        }


        // res.writeHeader(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        // res.write('<html>');
        // res.write('<meta charset="UTF-8">');
        // res.write('<body>');

        // res.write(
        //     '<form method="post" action="."><h4>새 영화 입력</h4>' +
        //     '<div><input type="text" name="title" placeholder="영화제목"></div>' +
        //     '<div><input type="text" name="director" placeholder="감독"></div>' +
        //     '<input type="submit" value="upload">' +
        //     '</form>'
        //     );
        // res.write('</body>');
        // res.write('</html>');
        // res.end();



        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(result));
    }
    else {
        // 영화 상세 정보를 위한 id 추출 /movies/0
        var id = url.split('/')[2];
        var movie = null;
        // 영화 데이터베이스에서 영화 검색
        for (var i = 0; i < movieList.length; i++) {
            var item = movieList[i];
            if (id == item.id) {
                movie = item;
                break;
            }
        }
        // 검색된 영화 정보 제공
        if (movie) {
            res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8'});
            res.end(JSON.stringify(movie));
        }
        else {
            // 영화 정보가 없는 경우
            res.writeHead(404, { 'Content-Type': 'application/json;charset=utf-8' });
            var message = {
                error : {
                    code : 404,
                    message : '영화 정보가 없습니다.'                    
                }
            }
            res.end(JSON.stringify(message));
        }
    }
}







//실습 과제
function handlePostRequest(req, res) {


}

function handlePutRequest(req, res) {

}

function handleDeleteRequest(req, res) {


    var url = req.url;

    var list = [];

    if (url == '/movies') {
        // 영화 목록 만들기
        
        for (var i = 0; i < movieList.length; i++) {
            var movie = movieList[i];
            list.push({ id: movie.id, title: movie.title });
        }
        
        // 항목 갯수와 영화 목록 정보        
        var result = {
            count: list.length,
            data: list
        }

        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
        res.end(JSON.stringify(result));
    }
    else {
        // 영화 상세 정보를 위한 id 추출 /movies/0
        var id = url.split('/')[2];
        var movie = null;
        // 영화 데이터베이스에서 영화 검색
        for (var i = 0; i < movieList.length; i++) {
            var item = movieList[i];
            if (id == item.id) {
                
                movieList[i].data.splice(1,1);
            }
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8'});
        res.end(JSON.stringify(movieList));
    }



}

