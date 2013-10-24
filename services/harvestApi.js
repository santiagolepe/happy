var https = require('https');
var toJson = require('xml2js').parseString;
var opts = require('../config/settings').harvest;

module.exports = {

  api: function(options, cb){
    var opt = {
      hostname: options.harvest_app+opts.hostname,
      path: options.path,
      port: opts.port,
      headers: opts.headers,
      method: options.method,
      auth: options.harvest_email+':'+options.harvest_pwd
    };

    //if send PUT or POST - send a body
    if(options.body){
      var body = options.body;
      opt.headers['Content-Length'] = Buffer.byteLength(body);
    }
    var req = https.request(opt, function(res){
      res.on('data', function(data){
        toJson(data.toString(), function(err, json){
          if(err){ return cb(err); }
          return cb(null, json);
        });
      });
    });

    //Send body if post or put
    if(options.body){
      req.write(body);
    }

    //end request
    req.end();

    //handle error
    req.on('error', function(err){
      cb(err);
    });
  }

}
