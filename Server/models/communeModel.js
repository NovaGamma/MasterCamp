const mongoose = require("mongoose");

const CommuneSchema = mongoose.Schema({
  name : {type: String, required: true, unique: true}
});

module.exports = mongoose.model('Commune', CommuneSchema);
