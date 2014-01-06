var Metric = require('../models/metric.js')
  , Objective = require('../models/objective.js');

var Metrics = {
  create: function(req, res){
    var metric = new Metric(req.body);
    metric.save(function(err, metric){
      res.redirect('/objectives/'+metric.objective);
    });
  }
, destroy: function(req, res){
    Metric.findById(req.params.id,function(err, metric){
      if(!err){
        metric.remove();
        res.send({message: 'deleted', metric: metric});
      }
    });
  }
};

module.exports = Metrics;
