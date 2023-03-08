var express = require("express");
var router = express.Router();
const { default: mongoose } = require("mongoose");
const { Customer } = require("../models");
mongoose.connect("mongodb://localhost:27017/Test");
const { findDocuments } = require("../helpers/MongoDbHelper");

router.post("/", function (req, res, next) {
  try {
    const newItem = new Customer(req.body);
    newItem.save().then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.send(err);
  }
});

router.get("/", function (req, res, next) {
  try {
    Customer.find().then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    Customer.findById(req.params.id).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", function (req, res, next) {
  const { id } = req.params;
  const { firstName, lastName, address, email, yearOfBirth, phoneNumber } = req.body;
  try {
    Customer.findByIdAndUpdate(id, { firstName, lastName, address, email, yearOfBirth, phoneNumber }, { new: true }).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    const id = req.params.id;
    Customer.findByIdAndDelete(id).then((result) => {
      res.send("xoá thành công");
    });
  } catch (err) {
    res.send(err);
  }
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 4
// ------------------------------------------------------------------------------------------------
router.get("/questions/4", function (req, res) {
  const text = "Phú Mậu";
  const query = { address: new RegExp(`${text}`) };

  findDocuments({ query }, "customers")
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 5
// ------------------------------------------------------------------------------------------------
router.get("/questions/5", function (req, res) {
  const text = "1999";
  const query = { yearOfBirth: new RegExp(`${text}`) };

  findDocuments({ query }, "customers")
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
