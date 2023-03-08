var express = require("express");
var router = express.Router();
const { default: mongoose } = require("mongoose");
const { Product } = require("../models");
mongoose.connect("mongodb://localhost:27017/Test");
const { findDocuments } = require("../helpers/MongoDbHelper");

router.post("/", function (req, res, next) {
  try {
    const newItem = new Product(req.body);
    newItem.save().then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.send(err);
  }
});

router.get("/", function (req, res, next) {
  try {
    Product.find()
      .populate("category")
      .populate("supplier")
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    Product.findById(req.params.id)
      .populate("category")
      .populate("supplier")
      .then((result) => {
        res.send(result);
      });
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", function (req, res, next) {
  const { id } = req.params;
  const { name, price, discount, stock, categoryId, supplierId, description } = req.body;
  try {
    Product.findByIdAndUpdate(id, { name, price, discount, stock, categoryId, supplierId, description }, { new: true }).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    const id = req.params.id;
    Product.findByIdAndDelete(id).then((result) => {
      res.send("xoá thành công");
    });
  } catch (err) {
    res.send(err);
  }
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 1
// ------------------------------------------------------------------------------------------------
router.get("/questions/1", async (req, res, next) => {
  try {
    let query = { discount: { $lte: 10 } };
    const results = await findDocuments({ query: query }, "products");
    res.json({ ok: true, results });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 2
// ------------------------------------------------------------------------------------------------
router.get("/questions/2", async (req, res, next) => {
  try {
    let query = { stock: { $lte: 5 } };
    const results = await findDocuments({ query }, "products");
    res.json({ ok: true, results });
  } catch (error) {
    res.status(500).json(error);
  }
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 3
// ------------------------------------------------------------------------------------------------
router.get("/questions/3", async (req, res, next) => {
  // CÁCH 1
  // try {
  //   const s = { $subtract: [100, '$discount'] }; // (100 - 5)
  //   const m = { $multiply: ['$price', s] }; // price * 95
  //   const d = { $divide: [m, 100] }; // price * 95 / 100

  //   let aggregate = [{ $match: { $expr: { $lte: [d, 15000000] } } }];
  //   const results = await findDocuments({ aggregate }, 'products');

  //   res.json({ ok: true, results });
  // } catch (error) {
  //   res.status(500).json(error);
  // }

  // CÁCH 2
  try {
    const s = { $subtract: [100, "$discount"] }; // (100 - 5)
    const m = { $multiply: ["$price", s] }; // price * 95
    const d = { $divide: [m, 100] }; // price * 95 / 100

    let aggregate = [{ $match: { $expr: { $lte: [d, 15000000] } } }];
    Product.aggregate(aggregate)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
