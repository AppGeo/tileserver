'use strict';

var app = module.exports = require('express')();
var tiles = require('../tile');
app.get('/:map/preview', function(req, res){
  var map = req.params.map;
  if(!tiles.maps){
    return res.jsonp(500, {error:"maps not loaded yet"});
  }
  if(~tiles.maps.indexOf(map)){
    tiles.info(map).then(function(resp){
      res.render('preview', resp);
    }).then(null, function(e){
      res.jsonp(404,e);
    });
  }else{
    res.jsonp(404,{error:"no such map"});
  }
})