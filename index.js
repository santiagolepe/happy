var Hapi     = require('hapi'),
    routes   = require('./routes/index'),
    settings = require('./config/settings'),
    auth     = require('./services/auth');

var config = {
  auth: {
    'basic': {
      scheme: 'basic',
      validateFunc: auth.basic
    }
  }
};

server = new Hapi.Server(settings.app.host, settings.app.port, config);
//add the routes
server.addRoutes(routes);

//connect to the bdd
require('./services/mongoose').init(function(err, res){
  if(err){
    console.log(err);
  } else {
    console.log(res);

    //Start the api server
    server.start(function(){
      console.log("Server running at: " + server.info.uri);
    });
  }
});



