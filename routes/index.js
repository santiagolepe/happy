var userController     = require('../controllers/user_controller'),
    tokenController    = require('../controllers/token_controller'),
    projectsController = require('../controllers/projects_controller'),
    tasksController    = require('../controllers/tasks_controller'),
    timersController   = require('../controllers/timers_controller'),
    Hapi               = require('hapi'),
    authToken          = require('../services/auth');

//return error if the token inst sended 
var error = function(message){
  var error = Hapi.error.badRequest(message);
  error.response.code = 401;
  error.reformat();
  return error;
};

var auth = function(req, next){
  var token = req.raw.req.headers['x-happytoken'] || null;
  
  if(!token){ return next(error('Missing token')); }
  if(token.length !== 96){ return next(error('Invalid token')); }

  authToken.token(token, function(err, usr){
    if(err){ return next(error(err)); }
    
    //set the credentials
    next(usr);
  }); 
};

//Prerequisite before ejecute the handler
var pre = [{method: auth, assign: 'user'}];

module.exports = [
  
  //Restful to users
  {method: 'POST', path: '/v1/user', config: { handler: userController.createUser.bind(userController) } },
  {method: 'PUT', path: '/v1/user', config: {pre: pre, handler: userController.update.bind(userController)}},

  //Restful to tokens
  {method: 'POST', path: '/v1/token', config: {handler: tokenController.getToken.bind(tokenController)}},
  {method: 'GET', path: '/v1/token/renew', config: {pre: pre, handler: tokenController.renew.bind(tokenController)}},

  //Restful to projects
  {method: 'GET', path: '/v1/projects', config: {pre: pre, handler: projectsController.getAll.bind(projectsController)}},

  //Restful to tasks
  {method: 'GET', path: '/v1/project/{project_id}/tasks', config: {pre: pre, handler: tasksController.getAll.bind(tasksController)}},
  {method: 'POST', path: '/v1/project/{project_id}/task/{task_id}/start', config: {pre: pre, handler: tasksController.start.bind(tasksController)}},
  {method: 'POST', path: '/v1/project/{project_id}/task/{task_id}/stop', config: {pre: pre, handler: tasksController.stop.bind(tasksController)}},
  {method: 'POST', path: '/v1/project/{project_id}/task/{task_id}/finish', config: {pre: pre, handler: tasksController.finish.bind(tasksController)}},

  //Restful to timers
  {method: 'GET', path: '/v1/daily', config: {pre: pre, handler: timersController.getDaily.bind(timersController)}},
  {method: 'DELETE', path: '/v1/timer/{timer_id}', config: {pre: pre, handler: timersController.delete.bind(timersController)}}

];
