module.exports = { 
  createForOwner: function(org, cb){
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
  }
, addToUser: function(user, role, model, type){
    User.findById(user.id, function(err,u){
      u.roles.push(role);
      u[type].push(model);
      u.save(function(er, usr){
        if(er) { throw er }
      });
    });
  }
}

