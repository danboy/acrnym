User = require('../models/user.js');
module.exports = {
  isAllowed: function(req, res, next){
    if(!req.user){
      res.redirect('/');
    }
    next();
  }
, populateLocals: function(req, res, next){
    if(!req.user){
      next();
    }else{
      User.findById(req.user.id).populate('organizations').exec(function(err, user){
        res.locals.currentUser = user;
        res.locals.session = req.session;
        res.locals.title = "acrnym project manager";
        next();
      });
    }
  }
, csrf: function(req, res, next){
    res.locals.token = req.csrfToken();
    next();
  }
}
