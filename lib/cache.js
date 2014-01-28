var redis = require('then-redis');

function cache(){
  var db = redis.createClient();
  return function(key,timeout,callback){
    var expires;
    if(!callback){
      callback = timeout;
    }else{
      expires = true;
    }
    return db.exists(key).then(function(present){
      if(present){
        return db.get(key).then(function(resp){
          return JSON.parse(resp);
        });
      }else{
        return callback().then(function(value){
          var resp;
          if(expires){
            resp = db.setex(key,timeout,JSON.stringify(value))
          }else{
            resp = db.set(key,JSON.stringify(value))
          }
          return resp.then(function(){
            return value;
          });
        });
      }
    });
  };
}

module.exports = cache();
