var harvestApi = require('../../services/harvestApi');

module.exports = {

  //create new timer with the id_task and name_task of pivotal and start it
  create: function(data, cb){
    if(!data.user){ return cb('error: harvest api | missing user'); }
    if(!data.pivotal){ return cb('error: pivotal api | missing pivotal.id'); }
    if(!data.payload){ return cb('error: harvest api | missing harvest project_id and task_id'); }
  
    var harvest_opts = {
      path: '/daily/add',
      method: 'POST',
      harvest_email: data.user.harvest_email,
      harvest_pwd: data.user.harvest_pwd,
      harvest_app: data.user.harvest_app,
      body: '<request>'+
              '<notes>'+data.pivotal.id+' '+data.pivotal.name+'</notes>'+
              '<project_id type="integer">'+data.payload.harvest_project_id+'</project_id>'+
              '<task_id type="integer">'+data.payload.harvest_task_id+'</task_id>'+
            '</request>'
    };
    //Post to create new timer and start it
    harvestApi.api(harvest_opts, function(err, timer){
      if(err){ return cb(err); }

      return cb(null, timer);
    });
  },

  //stop a timer
  stop: function(data, cb){
    if(!data.user){ return cb('error: harvest api | missing user'); }
    if(!data.payload || !data.payload.harvest_timer_id){ return cb('error: harvest api | missing harvest_timer_id'); }

    var harvest_opts = {
      path: '/daily/timer/'+data.payload.harvest_timer_id,
      method: 'GET',
      harvest_email: data.user.harvest_email,
      harvest_pwd: data.user.harvest_pwd,
      harvest_app: data.user.harvest_app
    };

    harvestApi.api(harvest_opts, function(err, timer){
      if(err){ return cb(err); }

      return cb(null, timer);
    });
  },


  //delete a timer
  delete: function(data, cb){
    if(!data.user){ return cb('error: harvest api | missing user'); }
    if(!data.params || !data.params.timer_id){ return cb('error: harvest api | missing harvest_timer_id'); }

    var harvest_opts = {
      path: '/daily/delete/'+data.params.timer_id,
      method: 'DELETE',
      harvest_email: data.user.harvest_email,
      harvest_pwd: data.user.harvest_pwd,
      harvest_app: data.user.harvest_app
    };

    harvestApi.api(harvest_opts, function(err, timer){
      if(err){ return cb(err); }

      return cb(null, timer);
    });
  },

  //get all data for harvest(projects, task, and timers for today)
  getDaily: function(data, cb){
    if(!data.user){ return cb('error: harvest api | missing user'); }

    var harvest_opts = {
      path: '/daily',
      method: 'GET',
      harvest_email: data.user.harvest_email,
      harvest_pwd: data.user.harvest_pwd,
      harvest_app: data.user.harvest_app
    };

    harvestApi.api(harvest_opts, function(err, daily){
      if(err){ return cb(err); }

      return cb(null, daily);
    });
  }

};
