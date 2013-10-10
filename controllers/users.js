User = require('../models/user.js');

module.exports = {
  index: function(req, res){
  
  }
, new: function(req, res){
    res.format({
      html: function(){
        res.render('users/new')
      }
    , json: function(){
        res.send('nothing here');
      }
    });
  }
, show: function(req, res){
    User.findById(req.user.id, function(err, user){
      User.rebuildTree(user, 1, function() {
        user.descendants(function(err, children) {
          res.format({
            html: function(){
              res.render('users/profile', { user: user, children: children })
            }
          , json: function(){
              res.send( { user: user, children: children } );
            }
          });
        });
      });
    });
  }
, create: function(req, res){
    
  }
};
