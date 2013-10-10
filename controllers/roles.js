Role = require('../models/role.js');

module.exports = {
  index: function(req, res){
    Role.find(function(err, roles){
      res.send(err, roles)
    })    
  }
, create: function(req, res){
    var role = new Role(req.body);
    role.save(function(err, role){
      res.send('200', role)
    });
  }
}
