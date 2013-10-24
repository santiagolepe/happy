var harvest = require('../lib/harvest/timers');

module.exports = {
  
  //get all dialy data, projects, tasks, and timers enables
  getDaily: function(req){
    var data = {
      params: req.params,
      user: req.pre.user
    };

    harvest.getDaily(data, function(err, daily){
      if(err){ return req.reply(err); }

      req.reply(daily);
    });
  },

  //remove one timer, need the harvest timer id
  delete: function(req){
    var data = {
      params: req.params,
      user: req.pre.user
    };

    harvest.delete(data, function(err, daily){
      if(err){ return req.reply(err); }

      req.reply(daily);
    });
  }
}

