const mongoose = require("mongoose");
const schema = mongoose.Schema;
const AssignmentSchema = new schema({
  userId: { type: schema.Types.ObjectId, ref: "User" },
  toolId: { type: schema.Types.ObjectId, ref: "Tool" },
  quantity: Number,
  takenAt: Date,
  returnedAt: Date,
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
