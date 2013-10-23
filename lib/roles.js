module.exports = {
  createRoles: function(org, cb){
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
}
