var mongoose = require('mongoose')
  , Org = require('./organization.js')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , objectSchema = new Schema({
      name:         {type: String}
    , owner:        { type: Schema.Types.ObjectId, ref: 'User' }
    , organization: { type: Schema.Types.ObjectId, ref: 'Organization' }
    , objectives:   [{ type: Schema.Types.ObjectId, ref: 'Objective' }]
    , stories:      [{ type: Schema.Types.ObjectId, ref: 'Story' }]
    , roles:        [{ type: Schema.Types.ObjectId, ref: 'Role' }]
    , users:        [{ type: Schema.Types.ObjectId, ref: 'User' }]
    , pointScale:   {type: Number}
  });

objectSchema.post('save', function(doc){
  Org.update({_id: doc.organization},{$addToSet: {projects: doc}}, {upsert: true}, function(err, result){
    if(err){throw err;}
  });
});
objectSchema.post('remove', function(doc){
  Org.update({_id: doc.organization},{$pull: {projects: doc}}, {upsert: true}, function(err, result){
    if(err){throw err;}
  });
});

module.exports = mongoose.model('Project', objectSchema);
