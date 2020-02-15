const mongoose = require("mongoose");

const recenzijaSchema = mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
ocena: {type: Number, min: 0, max: 10, require: true},
opis: String,
ime: String
});

module.exports = mongoose.model('Recenzija', recenzijaSchema);