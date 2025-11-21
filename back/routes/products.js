const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

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

module.exports = router;
