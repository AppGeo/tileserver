'use strict';

var app = module.exports = require('express')();
var utils = require('../utils');
app.get('/:map/preview', function(req, res){
  var map = req.params.map;
  if(~utils.maps.indexOf(map)){
    res.render('preview', {map:map});
  }else{
    res.jsonp(404,{error:"no such map"});
  }
})