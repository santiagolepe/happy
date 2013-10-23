var https = require('https');
var opts  = require('../config/settings').pivotal;

module.exports = {

  api: function(options, cb){
    opts.path                      = options.path;
    opts.headers['X-TrackerToken'] = options.token;
    opts.method                    = options.method;

    //if send PUT or POST - send a body
    if(options.body){
      var body = JSON.stringify(options.body);
      opts.headers['Content-Length'] = body.length;
    }
     
    var req = https.request(opts, function(res){

      res.on('data', function(data){
        cb(null, data.toString());
      });
    });

    //Send body if post or put
    if(options.body){
      req.write(body);
      //remove the Content-Length
      delete opts.headers['Content-Length'];
    }

    //end request
    req.end();

    //handle error
    req.on('error', function(err){
      cb(err);
    });
  }

}
