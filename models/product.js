const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0, default: 0 },
  discount: { type: Number, min: 0, max: 75, default: 0 },
  stock: { type: Number, min: 0, default: 0 },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  supplierId: { type: Schema.Types.ObjectId, ref: "Suppliers", required: true },
  description: { type: String },
});

productSchema.virtual("total").get(function () {
  return (this.price * (100 - this.discount)) / 100;
});

productSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

productSchema.virtual("supplier", {
  ref: "Supplier",
  localField: "supplierId",
  foreignField: "_id",
  justOne: true,
});

productSchema.set("toObject", { virtuals: true });
// Virtuals in JSON
productSchema.set("toJSON", { virtuals: true });

const Product = model("Product", productSchema);
module.exports = Product;
