var User   = require('../models/user.js');
var bcrypt = require('bcrypt');

module.exports = {

  basic: function(email, pass, next){
    
    User.findOne({email: email}, function(err, usr){
     if(err){ return next(err, false); }
     
     if(!usr){return next('invalid credentials', false)}

     bcrypt.compare(pass, usr.password, function(err, valid){
       if(err){return next(err, false)}

       if(!valid){ return next('invalid credentials', false)}

       return next(null, true, {email: usr.email});
     });

    });
  },

  token: function(token, next){
  
    User.findOne({token: token}, function(err, usr){
      if(err){ return next(err); }

      if(!usr){ return next('invalid token'); }
      return next(null, usr);
    });

  }

};
