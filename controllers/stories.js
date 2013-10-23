var Project = require('../models/project.js')
  , Story = require('../models/story.js')
  , Roles = require('../modules/roles')
  , points = require('../config/points.js');

var pointsForSelect = function(points){
  var collection = [];
  points.forEach(function(point, index){
    collection.push([point, index]);
  });
  return collection;
}
module.exports = {
  create: function(req, res){
    var story = new Story(req.body);
    story.save(function(err,story){
      if(err){throw err;}
      Project.update({_id: req.body.project},{$addToSet: {stories: story}}, function(e, project){
        if(e){res.send(e)}
        Roles.createForOwner(story,function(roles){
          story.roles = roles;
          story.save(function(err, story){
            Roles.addToUser(req.user, roles[0], story, 'stories');
            res.redirect('/projects/'+project.id);
          });
        });
      })
    });
  }
, show: function(req, res){
    Story.findById(req.params.id, function(err, story){
      res.render('stories/show', { story: story });
    });
  }
, edit: function(req, res){
    Story.findById(req.params.id, function(err, story){
      res.render('stories/edit', { story: story, points: pointsForSelect(points[req.session.pointScale].values) });
    });
  }
, update: function(req, res){
    Story.update({_id: req.params.id},{$set: req.body}, {upsert: true}, function(err, story){
      res.redirect('/projects/'+req.body.project)
    })
  }
};
