'use strict';

var app = module.exports = require('express')();
var cache = require('../cache');
var request = require('request');
var Promise = require('bluebird');
var tiles = require('../tile');
app.get('/maps',function(req,res){
  cache('maps',function(){
    return new Promise(function(yes,no){
      if(tiles.maps){
        yes(tiles.maps);
      }else{
        no(tiles.maps);
      }
    });
  }).then(function(v){
    return res.jsonp(v);
  },function(e){
    return res.jsonp(500,e);
  });
});
app.get('/',function(req,res){
  res.render('maps',{maps:tiles.maps});
});