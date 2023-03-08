const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const employeeSchema = new Schema({
  firstName: { type: String, min: 0, max: 50, require: true },
  lastName: { type: String, min: 0, max: 50, require: true },
  phoneNumber: { type: String, min: 0, max: 50 },
  address: { type: String, min: 0, max: 500, require: true },
  email: { type: String, min: 0, max: 50, require: true },
  yearOfBirth: String,
});

employeeSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

employeeSchema.set("toObject", { virtuals: true });
employeeSchema.set("toJSON", { virtuals: true });

const Employee = model("Employee", employeeSchema);
module.exports = Employee;
