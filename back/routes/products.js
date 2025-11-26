const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const mongoose = require("mongoose");

// GET /products - vrati sve proizvode
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Greška na serveru", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { naziv, kategorija, cena, kolicina, dobavljac } = req.body;

    if (!naziv || !kategorija || !cena || !kolicina || !dobavljac) {
      return res.status(400).json({ msg: "Sva polja su obavezna" });
    }

    const newProduct = await new Product({
      naziv,
      kategorija,
      cena,
      kolicina,
      dobavljac,
    });

    await newProduct.save();
    res.status(201).json({ msg: "proizvod dodat", product: newProduct });
  } catch (err) {
    res.status(500).json({ msg: "greska servera" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Provera da li je prosleđeni ID validan ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Nevalidan ID" });
    }

    // Pokušaj da obrišeš proizvod
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ msg: "Proizvod nije pronađen" });
    }

    res.json({ msg: "Proizvod obrisan", product: deleted });
  } catch (err) {
    res.status(500).json({ msg: "Greška servera", error: err.message });
  }
});

module.exports = router;
