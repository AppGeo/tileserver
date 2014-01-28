'use strict';
var tiles = require('../tile');
var cache = require('../cache');
var osw = module.exports = require('express')();

osw.get('/:map/:z/:x/:y.png', function(req, res){
  cache(req.path,360,function(){
    return tiles.get(req.params.map,req.params.z,req.params.x,req.params.y);
  }).then(function(buffer){
    res.type('png');
    res.send(new Buffer(buffer));
  },function(reason){
    console.log(reason);
    res.send(500,reason);
  });
});