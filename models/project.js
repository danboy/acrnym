var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , projectSchema = new Schema({
      name:         {type: String}
    , owner:        { type: Schema.Types.ObjectId, ref: 'User' }
    , objectives:   [{ type: Schema.Types.ObjectId, ref: 'Objective' }]
    , project:      { type: Schema.Types.ObjectId, ref: 'Project' }
    , stories:      [{ type: Schema.Types.ObjectId, ref: 'Story' }]
    , roles:        [{ type: Schema.Types.ObjectId, ref: 'Role' }]
    , pointScale:   {type: Number}
  });
 
module.exports = mongoose.model('Project', projectSchema);
