import mongoose from "mongoose"

const CommuneSchema = mongoose.Schema({
  name : {type: String, required: true, unique: true}
});

let Commune = mongoose.model('Commune', CommuneSchema);

export {Commune}