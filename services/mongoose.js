var mongoose = require('mongoose'),
    settings = require('../config/settings').db;

module.exports = {
  
  init: function(cb){

    mongoose.connect('mongodb://' + settings.host + '/' + settings.name, cb);
    
  }

};
