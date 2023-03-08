var express = require("express");
var router = express.Router();
const { default: mongoose } = require("mongoose");
const { Order } = require("../models");
mongoose.connect("mongodb://localhost:27017/Test");

router.post("/", function (req, res, next) {
  try {
    const newItem = new Order(req.body);
    newItem.save().then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.send(err);
  }
});

// GET
router.get("/", function (req, res, next) {
  try {
    Order.find()
      .populate("orderDetails.product")
      .populate("customer")
      .populate("employee")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    Order.findById(req.params.id)
      .populate("orderDetails.product")
      .populate("customer")
      .populate("employee")
      .then((result) => {
        res.send(result);
      });
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", function (req, res, next) {
  const { id } = req.params;
  const { shippedDate, status, description, shippingAddress, paymentType, customerId, employeeId, orderDetails } = req.body;
  try {
    Order.findByIdAndUpdate(
      id,
      {
        shippedDate,
        status,
        description,
        shippingAddress,
        paymentType,
        customerId,
        employeeId,
        orderDetails,
      },
      { new: true },
    ).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    const id = req.params.id;
    Order.findByIdAndDelete(id).then((result) => {
      res.send("xoá thành công");
    });
  } catch (err) {
    res.send(err);
  }
});

// ------------------------------------------------------------------------------------------------
// QUESTIONS 7
// ------------------------------------------------------------------------------------------------
router.get("/questions/7", function (req, res, next) {
  try {
    const { status } = req.query;
    Order.find({ status: status }, { createdDate: 1, status: 1, paymentType: 1, orderDetails: 1, customerId: 1 })
      .populate({ path: "orderDetails.product", select: { name: 1, price: 1, discount: 1, stock: 1 } })
      .populate({ path: "customer", select: "firstName lastName" })
      .populate("employee")
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
