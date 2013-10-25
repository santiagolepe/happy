var User = require('../models/user.js');
var bcrypt = require('bcrypt');
module.exports = {

  getToken: function(req){
    var email = req.payload.email;
    var password = req.payload.password;
    console.log(req.payload);
    User.findOne({email: email}, function(err, usr){
      if(err){ return req.reply(err); }
      if(!usr){ return req.reply({err: 'invalid credentials'}).code(400); }


     bcrypt.compare(password, usr.password, function(err, valid){
       if(err){return req.reply(err); }

       if(!valid){ return req.reply({err: 'invalid credentials'}).code(400);}

       req.reply(usr.token).code(200);
     });

    });
  },

  renew: function(req){
    var email = req.pre.user.email;
    
    User.findOne({email: email}, function(err, usr){
      if(err){ return req.reply(err); }
      
      //generate another token
      usr.createToken(function(){

        usr.save(function(err, usr2){
          if(err){ return req.reply(JSON.stringify(err)).code(400); }

          req.reply(usr2.token).code(201);
        });
      });
    });
  }

};
