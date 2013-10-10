var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , projectSchema = new Schema({
      name:         {type: String}
    , organization: { type: Schema.Types.ObjectId, ref: 'Organization' }
    , roles:        [{ type: Schema.Types.ObjectId, ref: 'Role' }]
  });
 
module.exports = mongoose.model('Project', projectSchema);
