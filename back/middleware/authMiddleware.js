const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Preuzimamo token iz Authorization header-a: "Bearer TOKEN"
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Token nedostaje" });
  }

  try {
    const decoded = jwt.verify(token, "tajni_kljuc"); // isti key kao kod logina
    req.user = decoded; // čuvamo podatke iz tokena u req.user
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Nevažeći token" });
  }
};

module.exports = authMiddleware;
