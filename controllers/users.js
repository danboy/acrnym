User = require('../models/user.js');

module.exports = {
  index: function(req, res){
    User.find(function(err, users){
        res.format({
          html: function(){
            res.render('users/index', { users: users })
          }
        , json: function(){
            res.send( { users: users } );
          }
        });
    });
  
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
    User.findById(req.user.id).populate('objectives organizations').exec(function(err, user){
      User.rebuildTree(user, 1, function() {
        user.ancestors(function(err, users) {
          res.format({
            html: function(){
              res.render('users/profile', { user: user, ancestors: users })
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
