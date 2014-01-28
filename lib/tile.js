var mapnik = require('tilelive-mapnik');
var mbtiles = require('mbtiles');
var tilelive = require('tilelive');
mapnik.registerProtocols(tilelive);
mbtiles.registerProtocols(tilelive);
var Promise = require('bluebird');
var config = require('../config.json');
var sources = {};
var cache = require("tilelive-cache")(tilelive, {
  size: 50 // 50MB cache
});
var load = Promise.promisify(cache.load,cache);
Promise.all(config.sources.mapnik.map(function(map){
  return load('mapnik://'+__dirname+'/../mapstyles/'+map+'.xml').then(function(tilesource){
    sources[map] = tilesource;
  });
}));
Promise.all(config.sources.mbtiles.map(function(map){
  return load('mbtiles://'+__dirname+'/../tiles/'+map+'.mbtiles').then(function(tilesource){
    sources[map] = tilesource;
  });
}));
function get(map, x, y, z){
  var source = sources[map];
  return new Promise(function(yes,no){
    if(!source){
      return no('no such tile');
    }
    source.getTile(x,y,z,function(err, data){
      if(err){
        return no(err);
      }
      yes(data);
    });
  });
};
exports.get = get;