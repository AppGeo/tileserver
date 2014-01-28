var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
if(cluster.isMaster){
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('disconnect', function(worker) {
    console.error('worker ' + worker.process.pid + ' disconnect! restarting');
    cluster.fork();
  });
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
}else{
  require('./lib/server');
}