var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , organizationSchema = new Schema({
      name:         {type: String}
    , objectives:   [{ type: Schema.Types.ObjectId, ref: 'Objective' }]
    , roles:        [{ type: Schema.Types.ObjectId, ref: 'Role' }]
  });
 
module.exports = mongoose.model('Organization', organizationSchema);
