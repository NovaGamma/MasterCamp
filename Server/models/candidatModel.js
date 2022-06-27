const mongoose = require("mongoose");

const CandidatSchema = mongoose.Schema({
  communeID : {type: mongoose.ObjectId, required: true},
  name : {type: String, required: true},
  date : {type: Date, required: true}
});

module.exports = mongoose.model('Candidat', CandidatSchema);
