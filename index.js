var Hapi     = require('hapi'),
    routes   = require('./routes/index'),
    settings = require('./config/settings'),
    auth     = require('./services/auth');


var config   = settings.config;

//Set up auth handler
config.auth.basic.validateFunc = auth.basic;

server = new Hapi.Server(settings.app.host, settings.app.port, config);

//add endpoints
server.addRoutes(routes);

//connect to the bdd
require('./services/mongoose').init(function(error){
  if(error){ throw new Error('Error: ', error); }

  //Start the api server
  server.start(function(){
    console.log("Server running at: " + server.info.uri);
  });

});
