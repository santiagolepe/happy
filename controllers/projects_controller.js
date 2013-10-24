var pivotal = require('../services/pivotalApi');

module.exports = {

  getAll: function(req){
  
    var options = {
      path:'/services/v5/projects',
      token: req.pre.user.pivotal_token
    };

    pivotal.api(options, function(err, projects){
      if(err){ return req.reply(err); }
      req.reply(projects);
    });

  }

}
