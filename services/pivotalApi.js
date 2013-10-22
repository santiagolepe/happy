var https = require('https');

var opts = {
  hostname: 'www.pivotaltracker.com',
  path: '/',
  method: 'GET',
  port: 443,
  headers: { 'X-TrackerToken': 'XXX-XXX-XXX-XXX-XXX' }

};

module.exports = {

  projects: function(options, cb){
    opts.path                      = options.path;
    opts.headers['X-TrackerToken'] = options.token;
  
    var req = https.request(opts, function(res){
      res.on('data', function(data){
        cb(null, data.toString());
      });
    });

    //end request
    req.end();

    //handle error
    req.on('error', function(err){
      cb(err);
    });
  }

}
