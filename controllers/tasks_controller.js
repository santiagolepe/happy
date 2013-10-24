var pivotal = require('../lib/pivotal/tasks');
var harvest = require('../lib/harvest/timers');

module.exports = {

  //get all task, in unstarted, reject, started
  getAll: function(req){
    var data = {
      params: req.params,
      user: req.pre.user
    };

    pivotal.getAll(data, function(err, tasks){
      if(err){ return req.reply(err); }

      req.reply(tasks);
    });
  },

  start: function(req){
    var data = {
      params: req.params,
      user: req.pre.user,
      payload: req.payload //get object {harvest_project_id: x, harvest_task_id}
    };

    //start the task in pivotal
    pivotal.start(data, function(err, task){
      if(err){return req.reply(err); }

      //start the timer in harvest for today
      data.pivotal = task;
      harvest.create(data, function(err, timer){
        if(err){ return req.reply(err); }
        console.log(timer);
        return req.reply(task);
      });
    });
  },

  stop: function(req){
    var data = {
      params: req.params,
      user: req.pre.user,
      payload: req.payload //get object {harvest_timer_id}
    };

    //stop the timer in harvest
    harvest.stop(data, function(err, timer){
      if(err){ return req.reply(err); }

      req.reply(timer);
    });
  },

  
  finish: function(req){
    var data = {
      params: req.params,
      user: req.pre.user,
      payload: req.payload //get object {harvest_timer_id}
    };

    //finish the task in harvest, became to deliver
    pivotal.finish(data, function(err, task){
      if(err){ return req.reply(err); }

        harvest.stop(data, function(err, timer){
          if(err) {return req.reply(err); }
          
          req.reply(task);
        });
    });
  },
}
