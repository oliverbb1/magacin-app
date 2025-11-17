const mongoose = require("mongoose");

const ToolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalQuantity: { type: Number, required: true },
  availableQuantity: { type: Number, required: true },
});

module.exports = mongoose.model("Tool", ToolSchema);
