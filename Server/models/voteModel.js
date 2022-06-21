const mongoose = require("mongoose");

const VoteSchema = mongoose.Schema({
  voterID : {type: mongoose.ObjectId, required:true, unique:true},
  communeID : {type: mongoose.ObjectId, required: true}
});

module.exports = mongoose.model('Vote', VoteSchema);
