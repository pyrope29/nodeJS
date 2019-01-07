var fs = require('fs');

var file = 'read.txt';

fs.access(file, fs.f_OK, function(error){
    if(error){
        console.log('파일없음');
        process.exit(1);
    } else {
        console.log('파일존재');
        fs.stat(file, function(err,stats){
            if(err){
                console.log("fs.stat : " + err);
                return;
            } 
            //console.log('Create : ', stats['birthtime']);
            //console.log('size : ', stats['size']);
            //console.log('isFile : ', stats.isFile());
            //console.log('isDirectory : ', stats.isDirectory());
            //console.log('isBlockDevice : ', stats.isBlockDevice());

            if(stats.isFile()){
                fs.readFile(file, function(err, data){
                    if(err){
                        console.log('File Read Error', err);
                        return;
                    } 
                    //var str = data.toString('UTF-8');
                    console.log('File COntents : ', data);
                });
            }
        });
    }

});

