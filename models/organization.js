var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , organizationSchema = new Schema({
      name:         {type: String}
    , owner:        { type: Schema.Types.ObjectId, ref: 'User' }
    , objectives:   [{ type: Schema.Types.ObjectId, ref: 'Objective' }]
    , projects:     [{ type: Schema.Types.ObjectId, ref: 'Project' }]
    , roles:        [{ type: Schema.Types.ObjectId, ref: 'Role' }]
  });
 
organizationSchema.methods.findForUser = function (userId, cb) {
  return this.model('Organization').find({ type: this.type }, cb);
}
module.exports = mongoose.model('Organization', organizationSchema);
