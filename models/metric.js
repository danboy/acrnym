var mongoose = require('mongoose')
  , Objective = require('./objective.js')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , objectSchema = new Schema({
      description:  {type: String}
    , achieved:     {type: Number}
    , owner:        { type: Schema.Types.ObjectId, ref: 'User' }
    , objective:    { type: Schema.Types.ObjectId, ref: 'Objective' }
  });

objectSchema.post('save', function(doc){
  Objective.update({_id: this.objective},{$addToSet: {metrics: this}}, {upsert: true}, function(err, objective){
  });
});
objectSchema.post('remove', function(doc){
  Objective.update({_id: doc.objective},{$pull: {metrics: doc}}, {upsert: true}, function(err, objective){
  });
});
 
module.exports = mongoose.model('Metric', objectSchema);
