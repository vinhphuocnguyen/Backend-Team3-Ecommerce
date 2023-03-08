var express = require("express");
var router = express.Router();
const { default: mongoose } = require("mongoose");

const { Category } = require("../models");
// MONGOOSE
mongoose.connect("mongodb://localhost:27017/Test");
const { findDocuments } = require("../helpers/MongoDbHelper");

/* GET users listing. */
router.get("/", function (req, res, next) {
  try {
    Category.find().then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    Category.findById(req.params.id).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

router.post("/", function (req, res, next) {
  try {
    const newItem = new Category(req.body);
    newItem.save().then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.send(err);
  }
});

router.patch("/:id", function (req, res, next) {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    Category.findByIdAndUpdate(id, { name, description }, { new: true }).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    const id = req.params.id;
    Category.findByIdAndDelete(id).then((result) => {
      res.send("xoá thành công");
    });
  } catch (err) {
    res.send(err);
  }
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 18
// ------------------------------------------------------------------------------------------------
router.get("/questions/18", function (req, res) {
  const aggregate = [
    {
      $lookup: {
        from: "products",
        let: { id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$$id", "$categoryId"] },
            },
          },
        ],
        as: "products",
      },
    },
    {
      $addFields: { numberOfProducts: { $size: "$products" } },
    },
  ];

  findDocuments({ aggregate: aggregate }, "categories")
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = router;
