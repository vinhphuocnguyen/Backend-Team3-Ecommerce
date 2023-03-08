var express = require("express");
var router = express.Router();
const { default: mongoose } = require("mongoose");
const { Supplier } = require("../models");
mongoose.connect("mongodb://localhost:27017/Test");

router.get("/", function (req, res, next) {
  try {
    Supplier.find().then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    Supplier.findById(req.params.id).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/", function (req, res, next) {
  try {
    const newItem = new Supplier(req.body);
    newItem.save().then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.send(err);
  }
});

router.patch("/:id", function (req, res, next) {
  const { id } = req.params;
  const { name, email, phoneNumber, address } = req.body;
  try {
    Supplier.findByIdAndUpdate(id, { name, email, phoneNumber, address }, { new: true }).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    const id = req.params.id;
    Supplier.findByIdAndDelete(id).then((result) => {
      res.send("xoá thành công");
    });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
