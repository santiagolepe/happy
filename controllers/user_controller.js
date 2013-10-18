module.exports = {

  createUser: function(req){
    console.log(req.payload);
    req.reply('Error').code(201);
  }

}
