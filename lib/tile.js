var mapnik = require('tilelive-mapnik');
var mbtiles = require('mbtiles');
var tilelive = require('tilelive');
mapnik.registerProtocols(tilelive);
mbtiles.registerProtocols(tilelive);
var Promise = require('bluebird');
var handlebars = require('handlebars');
var sources = {};
var loaded = false;
var listners = [];
var cache = require("tilelive-cache")(tilelive, {
  size: 50 // 50MB cache
});
var load = Promise.promisify(cache.load,cache);
var list = Promise.promisify(tilelive.list,tilelive);
loadSources('./tiles').then(function(){
  loaded = true;
  if(listners.length){
    listners.forEach(function(f){
      f(null, Object.keys(sources));
    });
  }
  exports.maps = Object.keys(sources);
});
function loadSources(source){
  return list(source).then(function(result){
    return Promise.all(Object.keys(result).map(function(map){
      return load(result[map]).then(function(tilesource){
        sources[map] = tilesource;
      });
    }));
  });
}
function getTile(map, x, y, z){
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
function getGrid(map, x, y, z){
  var source = sources[map];
  return new Promise(function(yes,no){
    if(!source){
      return no('no such tile');
    }
    source.getGrid(x,y,z,function(err, data){
      if(err){
        return no(err);
      }
      yes(data);
    });
  });
};
function getInfo(map){
  var source = sources[map];
  return new Promise(function(yes,no){
    if(!source){
      return no('no such tile');
    }
    source.getInfo(function(err, resp){
      if(err){
        return no(err);
      }
      resp.tilejson = '2.1.0';
      if(resp.scheme){
        delete resp.scheme;
      }
      resp.leaflet = {};
      resp.leaflet.tiles = "/"+map+"/{z}/{x}/{y}.png";
      if(resp.template){
        resp.leaflet.grids = "/"+map+"/{z}/{x}/{y}.grid.json";
        resp.template = resp.template.replace(/\n/g,'\\n');
      }
      yes(resp);
    });
  });
};
exports.get = getTile;
exports.grid = getGrid;
exports.info = getInfo;
exports.sources = function(cb){
  if(loaded){
    cb(null, Object.keys(sources));
  }else{
    listners.push(cb);
  }
}