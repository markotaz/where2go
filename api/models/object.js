const mongoose = require("mongoose");

const recenzijaSchema = mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
ocena: {type: Number, min: 0, max: 10, require: true},
opis: String,
ime: String
});

const stoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    brojMesta: Number,
    isFree: Boolean,
    isReserved: {type: Boolean, default: false}
});
const kontaktSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    facebook: String,
    instagram: String, 
    telefon: String
});

const objectSchema = mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
naziv: String,
tipObjekta: String,
opis: String,
ocena: {type: mongoose.Decimal128, min: 0, max: 10},
recenzije: [recenzijaSchema],
countRec: Number,
stolovi: [stoSchema],
brSlobodnihStolova: {type: Number, min: 0},
slikaObjekta:{type: String, required: true, default: "uploads\\2019-06-01T04-18-37.251Z1614.jpg"},
slikaPlanaObjekta:{type: String, required: true, default: "uploads\\testPlan.jpg"},
mapa:String,
kontakti: kontaktSchema
});

module.exports = mongoose.model('Object', objectSchema);

