var mongoose = require('mongoose'),
    validate = require('mongoose-validate'),
      bcrypt = require("bcrypt"),
      Schema = mongoose.Schema;

var userSchema = new Schema({
    
    first_name:   {type: 'String', required: true},
    last_name:    {type: 'String', required: true},
    email:        {type: 'String', required: true, unique: true, index: true, lowercase:true, validate: [validate.email, 'invalid email address']},
    token:        {type: 'String'},
    harvest_email:{type: 'String', required: true, validate: [validate.email, 'invalid email address']},
    harvest_pwd:  {type: 'String', required: true},
    harvest_app:  {type: 'String', required: true},
    pivotal_token:{type: 'String', required: true},
    password:     {type: 'String', required: true, match:/^.{8,200}$/},
    type:         {type: 'String', default: "free"},
    created_at:   {type: Date, default: Date.now}

});

//method to encrypt the password
userSchema.methods.encryptPass = function(next){
  var self = this;

  //Encrypt pass salt 10
  bcrypt.genSalt(10, function(err, salt){
    if(err){ return next(err); }
    bcrypt.hash(self.password, salt, function(err, hash){
      if(err){ return next(err) }
      self.password = hash;
      next();
    });
  });
};

//method to generate token 
userSchema.methods.createToken = function(next){
  var self = this;

  //Generate token
  require('crypto').randomBytes(48, function(ex, buf) {
    self.token = buf.toString('hex');
    next();
  });
};

module.exports = mongoose.model('user', userSchema); 


