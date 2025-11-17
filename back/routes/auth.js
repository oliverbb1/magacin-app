const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};

  // Provera samo obaveznih polja
  if (!name || !email || !password)
    return res.status(400).json({ msg: "Name, email i password su obavezni" });

  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: "Email je već registrovan" });

    // Kreiranje korisnika, role će uzeti default vrednost iz šeme
    const user = await new User({ name, email, password }).save();

    res.json({ msg: "Korisnik registrovan", user });
  } catch (err) {
    res.status(500).json({ msg: "Greška na serveru", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ msg: "Email i lozinka su obavezni" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ msg: "Neispravan email ili lozinka" });
    }

    res.json({ msg: "Login uspešan", user });
  } catch (err) {
    res.status(500).json({ msg: "Greška na serveru", error: err.message });
  }
});

module.exports = router;
module.exports = router;
