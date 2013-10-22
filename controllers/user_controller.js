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
      pivotal_token: data.pivotal_token,
      password:      data.password
    });

    user.createToken(function(){
      user.encryptPass(function(){
      
        user.save(function(err, usr){
          if(err) return req.reply(err);
          req.reply(usr.token).code(201);
        });

      });
    });
  },

  findByEmail: function(req){
    if(req.pre.user.type !== 'admin'){ return req.reply('need to be an administrator').code(401); }

    var email = req.params.email;

    User.find({email: email}, function(err, usr){
      if(err){ return req.reply(err); }
      req.reply(usr).code(200);
    });
  },

  delete: function(req){
    if(req.pre.user.type !== 'admin'){ return req.reply('need to be an administrator').code(401); }

    var email = req.params.email;

    User.findOneAndRemove({email: email}, function(err, res){
      if(err){ return req.reply(err); }

      req.reply(email).code(200);
    });
  },

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
  
      usr.encryptPass(function(){
        usr.save(function(err){
          if(err){return req.reply(err); }
          req.reply('success').code(201);
        });
      });

    });
  }

}
