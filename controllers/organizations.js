var Org   = require('../models/organization.js')
  , User  = require('../models/user.js')
  , Role  = require('../models/role.js');

var createRoles = function(org, cb){
  var roleTypes = ['owner', 'manager', 'member']
    , roles = [];
  roleTypes.forEach(function(role, index){
    role = new Role({name: role, _owner: org.id});
    role.save(function(err, r){
      roles[index] = r;
      if(index == (roleTypes.length - 1)){
        cb(roles);
      }
    });
  });
};

var addRoleToUser = function(user, role){
  User.findById(user._id, function(err,u){
    u.roles.push(role);
    u.save(function(er, usr){
      if(er) { throw er }
    });
  })
};
module.exports = {
  index: function(req, res){
    Org.find(function(err, orgs){
      res.format({
        html: function(){
          res.render('organizations/index', {orgs: orgs})
        }
      , json: function(){
          res.send(orgs)
        }
      });
    })    
  }
, show: function(req, res){
    Org.findById(req.params.id,function(err, org){
      res.format({
        html: function(){
          res.render('organizations/show', {org: org})
        }
      , json: function(){
          res.send(org)
        }
      });
    });
  }
, new: function(req, res){
    res.format({
      html: function(){
        res.render('organizations/new')
      }
    , json: function(){
        res.send('nothing here');
      }
    });
  }
, create: function(req, res){
    var org = new Org(req.body);
      console.log(org);
      createRoles(org,function(roles){
        org.roles = roles;
        org.save(function(err, org){
          addRoleToUser(req.user, roles[0]);
          res.send('200', org);
        });
      });
  }
}
