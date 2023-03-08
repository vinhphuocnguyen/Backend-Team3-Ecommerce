const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const categorySchema = new Schema({
  name: { type: String, min: 0, max: 50, require: true },
  description: { type: String, min: 0, max: 500 },
});

const Category = model("Category", categorySchema);
module.exports = Category;
