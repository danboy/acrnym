var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , storySchema = new Schema({
      name:         { type: String}
    , description:  { type: String}
    , points:       { type: Number}
    , type:         { type: Number }
    , requester:    { type: Schema.Types.ObjectId, ref: 'User' }
    , owner:        { type: Schema.Types.ObjectId, ref: 'User' }
    , project:      { type: Schema.Types.ObjectId, ref: 'Project' }
    , objectives:   [{ type: Schema.Types.ObjectId, ref: 'Objective' }]
    , comments:     [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    , labels:       [{ type: Schema.Types.ObjectId, ref: 'Label' }]
    , roles:        [{ type: Schema.Types.ObjectId, ref: 'Role' }]
  });
 
module.exports = mongoose.model('Story', storySchema);
