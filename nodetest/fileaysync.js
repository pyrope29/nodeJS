
   var fs = require('fs');
   fs.readFile("read.txt","utf8",function(err,content){
       console.log(content)
   });
   console.log("read file ....");