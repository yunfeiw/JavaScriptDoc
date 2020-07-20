(function autorun(){
    let x = 1;
    function log(x){
      console.log(x);
    };
    
    function run(fn){
      let x = 100;
      fn(x);
    }
    
    run(log);//1
})();
