const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const { Product, validate } = require("../../models/product.model");
const checkToken = require("../../lib/checkToken");

exports.findAll = async (req, res, next) => {
  // await checkToken(req, res, next);

  try {
    Product.find()
      .then(async (data) => {
        res.status(201).send({ data, message: "success", status: true });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "มีบางอย่างผิดพลาด",
        });
      });
  } catch (error) {
    res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
  }
};
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    Product.findById(id)
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: "ไม่สามารถหาผู้ใช้งานนี้ได้", status: false });
        else res.send({ data, status: true });
      })
      .catch((err) => {
        res.status(500).send({
          message: "มีบางอย่างผิดพลาด",
          status: false,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    Product.findByIdAndRemove(id, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `ไม่สามารถลบผู้ใช้งานนี้ได้`,
            status: false,
          });
        } else {
          res.send({
            message: "ลบผู้ใช้งานนี้เรียบร้อยเเล้ว",
            status: true,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "ไม่สามารถลบผู้ใช้งานนี้ได้",
          status: false,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "ไม่สามารถลบผู้ใช้งานนี้ได้",
      status: false,
    });
  }
};

exports.findByBranch = async (req, res) => {
  const id = req.params.id;
  try {
    Product.find({ product_branch_id: id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: "ไม่สามารถหาผู้ใช้งานนี้ได้", status: false });
        else res.send({ data, status: true });
      })
      .catch((err) => {
        res.status(500).send({
          message: "มีบางอย่างผิดพลาด",
          status: false,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};
