var User = require('../../models/user.js');
var Users = {
  index: function(req, res){
    User.find({organizations: req.params.id}, function(err, users){
      res.format({
        html: function(){
          res.render('organizations/users/index',{users: users, organization: req.params.id})
        }
      , json: function(){
          res.send(users);
        }
      });
    });
  }
, create: function(req, res){
    var user = new User(req.body);
    user.organizations.push(req.params.id);
    user.save(function(err, user){
      res.format({
        html: function(){
          res.redirect('organizations/'+req.params.id+'/users');
        }
      , json: function(){
          res.send(user);
        }
      });
    });
  }
};

module.exports = Users;
