var Project = require('../models/project.js')
  , Org = require('../models/organization.js')
  , Roles = require('../modules/roles')
  , _ = require('underscore')
  , points = require('../config/points.js');

var pointsForSelect = function(points){
  console.log(points);
  var collection = [];
  points.forEach(function(point, index){
    collection.push([point, index]);
  });
  return collection;
}
var createPointScaleForSelect = function(pointscales){
  return _.map(pointscales, function(point,index){return [point.type, index] })
}
module.exports = {
  create: function(req, res){
    var project = new Project(req.body);
    project.save(function(err,project){
      if(err){throw err;}
      Org.update({_id: req.body.organization},{$addToSet: {projects: project}}, function(e, org){
        if(e){res.send(e)}
        res.redirect("/organizations/"+req.body.organization);
        Roles.createForOwner(project,function(roles){
          project.roles = roles;
          project.save(function(err, project){
            Roles.addToUser(req.user, roles[0], project, 'projects');
            res.send('200', project);
          });
        });
      })
    });
  }
, edit: function(req, res){
    Project.findById(req.params.id).populate('stories').exec(function(err, project){
      res.render('projects/edit', { project: project, pointScales: createPointScaleForSelect(points)});
    });
  }
, show: function(req, res){
    Project.findById(req.params.id).populate('stories').exec(function(err, project){
      req.session.pointScale = project.pointScale;
      res.render('projects/show', { project: project, points: pointsForSelect(points[project.pointScale].values) });
    });
  }
, update: function(req, res){
    Project.update({_id: req.params.id},{$set: req.body}, {upsert: true}, function(err, project){
      res.redirect('/projects/'+req.params.id)
    })
  }
};
