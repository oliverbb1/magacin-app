const express = require("express");
const connectDB = require("./config/db"); // uvozimo db.js

const app = express();
app.use(express.json());

// Pokrećemo konekciju ka bazi
connectDB();

app.use("/auth", require("./routes/auth"));

// Start servera
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server pokrenut na http://localhost:${PORT}`);
});
