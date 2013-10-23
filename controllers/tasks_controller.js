var pivotal = require('../services/pivotalApi');

module.exports = {

  getAll: function(req){
    var project_id = req.params.project_id;
    var options    = {
      path:  '/services/v5/projects/'+project_id+'/stories?filter=state:started,unstarted,rejected',
      token: req.pre.user.pivotal_token
    };

    pivotal.api(options, function(err, tasks){
      if(err){ return req.reply(err); }
      req.reply(tasks);
    });
  },

  start: function(req){
    var project_id = req.params.project_id;
    var task_id    = req.params.task_id;
    var options    = {
      path:   '/services/v5/projects/'+project_id+'/stories/'+task_id,
      token:  req.pre.user.pivotal_token,
      method: 'PUT',
      body:   {'current_state': 'started'}
    }

    //start the task
    pivotal.api(options, function(err, task){
      if(err){return req.reply(err); }

      req.reply(task).code(201);
    });
  
  }

}
