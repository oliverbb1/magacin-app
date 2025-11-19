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

module.exports = router;
