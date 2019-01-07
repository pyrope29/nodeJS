var pathUtil = require('path');
var path = 'C:\\nodeprogram\\read.txt';

console.log('dirname : ', pathUtil.dirname(path));
console.log('basename : ', pathUtil.basename(path));
console.log('extname : ', pathUtil.extname(path));

console.log(__dirname);
console.log(__filename);
