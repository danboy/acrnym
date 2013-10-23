var Org   = require('../models/organization.js')
  , User  = require('../models/user.js')
  , Role  = require('../models/role.js')
  , Roles = require('../modules/roles.js')
  , _ = require('underscore')
  , points = require('../config/points.js');

var createPointScaleForSelect = function(pointscales){
  return _.map(pointscales, function(point,index){return [point.type, index] })
}
module.exports = {
  index: function(req, res){
    res.format({
      html: function(){
        res.render('organizations/index')
      }
    , json: function(){
        res.send(orgs)
      }
    });
  }
, show: function(req, res){
    Org.findById(req.params.id).populate('projects owner').exec(function(err, org){
      req.session.organization = org;
      res.format({
        html: function(){
          res.render('organizations/show', {org: org, pointScales: createPointScaleForSelect(points)})
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
, edit: function(req, res){
    Org.findById(req.params.id).populate('owner').exec(function(err, org){
      res.format({
        html: function(){
          res.render('organizations/edit', {org: org})
        }
      , json: function(){
          res.send('nothing here');
        }
      });
    });
  }
, create: function(req, res){
    var user = req.user;
    var org = new Org(req.body);
      Roles.createForOwner(org,function(roles){
        org.roles = roles;
        org.save(function(err, org){
          Roles.addToUser(user, roles[0], org, 'organizations');
          res.send('200', org);
        });
    });
  }
, update: function(req, res){
    Org.update({slug: req.params.id},{$set: req.body}, {upsert: true}, function(err, org){
      res.redirect('/organizations'+org.id)
    })
  }
}
