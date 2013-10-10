var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , roleSchema = new Schema({
      name:   { type: String}
    , _owner: { type: Schema.Types.ObjectId, ref: 'Project' }
  });
 
module.exports = mongoose.model('Role', roleSchema);
