import mongoose from "mongoose"

const VoteSchema = mongoose.Schema({
  candidatID : {type: mongoose.ObjectId, required:true, unique:true},
  communeID : {type: mongoose.ObjectId, required: true}
});

let Vote  = mongoose.model('Vote', VoteSchema);
export {Vote}
