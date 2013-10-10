var mongoose = require('mongoose')
  , NestedSetPlugin = require('mongoose-nested-set')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , userSchema = new Schema({
      date: {type: Date, default: Date.now}
    , name: {type: String}
    , email: String
    , googleId: String
    , githubId: String
    , roles:  [{ type: Schema.Types.ObjectId, ref: 'Role' }]
    , organizations:  [{ type: Schema.Types.ObjectId, ref: 'Organization' }]
    , projects:  [{ type: Schema.Types.ObjectId, ref: 'Project' }]
    , obejectives:  [{ type: Schema.Types.ObjectId, ref: 'Objective' }]
    , salted_pass: String
  });

userSchema.plugin(NestedSetPlugin);
module.exports = mongoose.model('User', userSchema);
