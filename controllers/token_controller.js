var User = require('../models/user.js');

module.exports = {

  getToken: function(req){
    var email = req.params.email;

    User.findOne({email: email}, function(err, usr){
      if(err){ return req.reply(err); }

      req.reply(usr.token).code(200);
    });
  }

};
