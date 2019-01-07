
    function sum(a , b ,callback){
           var result = a + b;
            callback();
       console.log("callback");
       return result;
    }        
   var r = sum(1,2,function(){
        console.log('a+b를 더했습니다');
        });    
   console.log(r);
