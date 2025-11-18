const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
const corsOptions = { origin: "http://localhost:5173" };
// Omogući CORS za frontend na portu 5173
app.use(cors(corsOptions));

// Parsiranje JSON-a
app.use(express.json());

// Povezivanje sa MongoDB
connectDB();

// Registracija ruta
app.use("/auth", require("./routes/auth"));

// Start servera
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server pokrenut na http://localhost:${PORT}`);
});
