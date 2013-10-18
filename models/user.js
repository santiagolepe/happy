module.exports = function(Mongoose){
  
  var Schema = Mongoose.Schema;

  Mongoose.model('user', new Schema({
    
    first_name: {type: 'String', required: true},
    last_name:  {type: 'String', required: true},
    email:      {type: 'String', required: true},
    token:      {type: 'String', required: true},
    harvest_email:{type: 'String', required: true},
    harvest_pwd:{type: 'String', required: true},
    pivotal:    {type: 'String', required: true},
    password:   {type: 'String', required: true},
    created_at: {type: Date, default: Date.now}

  },{collection: 'users'}));

  return Mongoose.model('user');

};
