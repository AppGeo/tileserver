'use strict';

var domain = require('domain'),
    cluster = require('cluster');

module.exports = function (server) {
  return function (req, res, next) {
    var d = domain.create();

    d.add(req);
    d.add(res);

    d.on('error', function (er) {
      console.error(er.stack);
      try {
        // make sure we close down within 30 seconds
        let killtimer = setTimeout(function () {
          process.exit(1);
        }, 30000);
        // But don't keep the process open just for that!
        killtimer.unref();
        server.close();
        cluster.worker.disconnect();

        res.json(500, {
          stack: er.stack,
          name: er.name,
          message: er.message,
          arguments: er.arguments,
          type: er.type
        });
      } 
      catch (er2) {
        console.error('Error sending 500!', er2.stack);
      }
    });

    d.run(next);
  };
};
