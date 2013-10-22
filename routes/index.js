var userController  = require('../controllers/user_controller');
var tokenController = require('../controllers/token_controller');
var Hapi            = require('hapi');
var authToken       = require('../services/auth');

var error = function(message){
  //return error if the token inst sended 
  var error = Hapi.error.badRequest(message);
  error.response.code = 401;
  error.reformat();
  return error;
};

var auth = function(req, next){
  var token   = req.raw.req.headers['x-happytoken'] || null;
  
  if(!token)              { return next(error('Missing token')); }
  if(token.length !== 96) { return next(error('Invalid token')); }

  authToken.token(token, function(err, usr){
    if(err)               { return next(error(err)); }
    
    //set the credentials and able auth
    next(usr);
  }); 
};

module.exports = [
  
  //Restful to users
  {method: 'POST',   path: '/user',         config: {pre: [{method: auth, assign: 'user'}], handler: userController.createUser.bind(userController) } },
  {method: 'GET',    path: '/user/{email}', config: {pre: [{method: auth, assign: 'user'}], handler: userController.findByEmail.bind(userController)}},
  {method: 'DELETE', path: '/user/{email}', config: {pre: [{method: auth, assign: 'user'}], handler: userController.delete.bind(userController)}},
  {method: 'PUT',    path: '/user',         config: {pre: [{method: auth, assign: 'user'}], handler: userController.update.bind(userController)}},

  //Restful to tokens
  {method: 'GET',   path: '/token',         config: {handler: tokenController.getToken.bind(tokenController), auth: {strategies: ['basic']}}},
  {method: 'GET',   path: '/token/renew',   config: {pre: [{method: auth, assign: 'user'}], handler: tokenController.renew.bind(tokenController)}}


];
