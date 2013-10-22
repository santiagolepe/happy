var User = require('../models/user.js');

module.exports = {

  getToken: function(req){
    var email = req.auth.credentials.email;
    User.findOne({email: email}, function(err, usr){
      if(err){ return req.reply(err); }

      req.reply(usr.token).code(200);
    });
  },

  renew: function(req){
    var email = req.pre.user.email;
    
    User.findOne({email: email}, function(err, usr){
      if(err){ return req.reply(err); }
      
      //generate another token
      usr.createToken(function(){

        usr.save(function(err, usr2){
          if(err){ return req.reply(err); }

          req.reply(usr2.token).code(201);
        });
      });
    });
  }

};
