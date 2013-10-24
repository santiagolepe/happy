var pivotalApi = require('../../services/pivotalApi');

module.exports = {

  start: function(data, cb){
    if(!data.params) { return cb('missing params'); }
    if(!data.params.project_id){ return cb('missing poroject_id'); }
    if(!data.params.task_id){ return cb('missing task_id'); }

    var pivotal_opts = {
      path: '/services/v5/projects/'+data.params.project_id+'/stories/'+data.params.task_id,
      token: data.user.pivotal_token,
      method: 'PUT',
      body: {'current_state': 'started'}
    };

    //start the task in pivotal
    pivotalApi.api(pivotal_opts, function(err, task){
      if(err){ return cb(err); }

      return cb(null, task);
    });
  
  },

  finish: function(data, cb){
    if(!data.params) { return cb('missing params'); }
    if(!data.params.project_id){ return cb('missing poroject_id'); }
    if(!data.params.task_id){ return cb('missing task_id'); }

    var pivotal_opts = {
      path: '/services/v5/projects/'+data.params.project_id+'/stories/'+data.params.task_id,
      token: data.user.pivotal_token,
      method: 'PUT',
      body: {'current_state': 'finished'}
    };

    //finish the task in pivotal
    pivotalApi.api(pivotal_opts, function(err, task){
      if(err){ return cb(err); }

      return cb(null, task);
    });
  
  },

  getAll: function(data, cb){
    if(!data.params) { return cb('missing params'); }
    if(!data.params.project_id){ return cb('missing poroject_id'); }

    var pivotal_opts = {
      path:  '/services/v5/projects/'+data.params.project_id+'/stories?filter=current_state:started,unstarted,rejected',
      token: data.user.pivotal_token
    };

    //get all tasks of pivotal
    pivotalApi.api(pivotal_opts, function(err, task){
      if(err){ return cb(err); }

      return cb(null, task);
    });
  }

};
