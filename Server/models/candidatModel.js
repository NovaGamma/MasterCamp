import mongoose from "mongoose"

const CandidatSchema = mongoose.Schema({
  communeID : {type: mongoose.ObjectId, required: true},
  name : {type: String, required: true},
  date : {type: Date, required: true},
  description: {type: String, required: false},
  parti: {type: String, required: false}
});

let Candidat = mongoose.model('Candidat', CandidatSchema);

export {Candidat}
