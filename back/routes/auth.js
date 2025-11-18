const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password)
    return res.status(400).json({ msg: "Name, email i password su obavezni" });

  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: "Email je već registrovan" });

    // **Hash lozinke pre čuvanja**
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      name,
      email,
      password: hashedPassword, // koristimo hash, ne plain text
    }).save();

    res.json({ msg: "Korisnik registrovan", user });
  } catch (err) {
    res.status(500).json({ msg: "Greška na serveru", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Email i password su obavezni" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Pogrešan email ili lozinka" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Pogrešan email ili lozinka" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "tajni_kljuc", // u produkciji stavi u .env
      { expiresIn: "1h" }
    );

    res.json({
      msg: "Uspešno ste se ulogovali",
      user: { id: user._id, email: user.email, role: user.role },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});
router.post("/logout", (req, res) => {
  // Ako želiš blacklist tokena, ovde bi ga dodao
  // Za sada samo šaljemo poruku
  res.json({ msg: "Uspešno ste se odjavili" });
});

module.exports = router;
module.exports = router;
