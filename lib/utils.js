var config = require('../config');
var maps = [];
Object.keys(config.sources).forEach(function(source){
  maps = maps.concat(config.sources[source]);
});

exports.maps = maps;