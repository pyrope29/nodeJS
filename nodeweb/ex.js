var ex = require('./ex.js');
ex.hello();
//함수 exports


var ge = require('./ge.js');
var geinstance = new ge(); //필요 시 new를 통해 사용
geinstance.run();
//class exports