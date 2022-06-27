const mongoose = require("mongoose");

const VoteSchema = mongoose.Schema({
  voterID : {type: ObjectId, required:true, unique:true},
  communeID : {type: ObjectId, required: true}
});

module.exports = mongoose.model('Vote', VoteSchema);
