const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  naziv: { type: String, required: true },
  kategorija: { type: String, required: true },
  cena: { type: Number, required: true },
  kolicina: { type: Number, required: true },
  dobavljac: { type: String, required: true },
  datumDodavanja: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Products", productsSchema);
