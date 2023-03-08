const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const customerSchema = new Schema({
  firstName: { type: String, min: 0, max: 50, require: true },
  lastName: { type: String, min: 0, max: 50, require: true },
  phoneNumber: { type: String, min: 0, max: 50 },
  address: { type: String, min: 0, max: 500, require: true },
  email: { type: String, min: 0, max: 50, require: true },
  yearOfBirth: String,
});

customerSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

customerSchema.set("toObject", { virtuals: true });
customerSchema.set("toJSON", { virtuals: true });

const Customer = model("Customer", customerSchema);
module.exports = Customer;
