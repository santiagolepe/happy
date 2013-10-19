var mongoose = require('mongoose'),
    settings = require('../config/settings');

module.exports = {
  
  init: function(cb){
    
    mongoose.connect('mongodb://' + settings.db.host + '/' + settings.db.name, function(err){
      if(err){
        return cb(err);
      }
      return cb(null, 'Mongoose READY !!');
    });

  }

};
