var mongoose = require('mongoose')
  , NestedSetPlugin = require('mongoose-nested-set')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , objectSchema = new Schema({
      name: {type: String}
    , description: {type: String}
    , user:  { type: Schema.Types.ObjectId, ref: 'User' }
    , dueDate: { type: Date } 
    , organizations:  [{ type: Schema.Types.ObjectId, ref: 'Organization' }]
    , projects:  [{ type: Schema.Types.ObjectId, ref: 'Project' }]
    , metrics:  [{ type: Schema.Types.ObjectId, ref: 'Metric' }]
    , stories:  [{ type: Schema.Types.ObjectId, ref: 'Story' }]
  });

objectSchema.plugin(NestedSetPlugin);
module.exports = mongoose.model('Objective', objectSchema);
