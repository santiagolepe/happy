var User = require('../models/user.js');

module.exports = {

  createUser: function(req){
    var data = req.payload;
    
    var user = new User({
      email:         data.email,
      first_name:    data.first_name,
      last_name:     data.last_name,
      harvest_email: data.harvest_email,
      harvest_pwd:   data.harvest_pwd,
      harvest_app:   data.harvest_app,
      pivotal_token: data.pivotal_token,
      password:      data.password
    });

    //create the unique token for this user
    user.createToken(function(){
      //encrypt her password
      user.encryptPass(function(){
      
        user.save(function(err, usr){
          if(err) return req.reply(err);
          req.reply(usr.token).code(201);
        });
      });
    });
  },

  //update user 
  update: function(req){
    var data   = req.payload;
    var email  = req.pre.user.email;

    User.findOne({email: email}, function(err, usr){
      if(err){ return req.reply(err); }

      if(!usr){ return req.reply('user not found').code(400); } 

      usr.first_name   = data.first_name;
      usr.last_name    = data.last_name,
      usr.harvest_email= data.harvest_email;
      usr.harvest_pwd  = data.harvest_pwd;
      usr.password     = data.password;
      usr.pivotal_token= data.pivotal_token;
      usr.harvest_app  = data.harvest_app
  
      usr.encryptPass(function(){
        usr.save(function(err){
          if(err){return req.reply(err); }
          req.reply('success').code(201);
        });
      });

    });
  }

}
