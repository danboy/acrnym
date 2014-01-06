User = require('../models/user.js'),
Objective = require('../models/objective.js');

var Objectives = {
  new: function(req ,res){
    res.render('objectives/new'); 
  }
, show: function(req, res){
    Objective.findById(req.params.id).populate('metrics').exec(function(err, objective){
      res.format({
        html: function(){
          res.render('objectives/show',{ objective: objective })
        }
      , json: function(){
          res.send(objective);
        }
      });
    });
  }
, create: function(req, res){
    var objective = Objective(req.body);
    objective.save(function(err, objective){
      if(err){res.send(500, err);}
      User.update({_id: req.user._id},{$addToSet: {objectives: objective}}, {upsert: true}, function(err, user){
        res.redirect('/objectives/'+objective._id);
      });
    });
  }
};

module.exports = Objectives;

