const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const ProductSchema = new mongoose.Schema({
  product_branch_id: { type: String, required: true },
  product_id: { type: String, required: true },
  product_name: { type: String, required: true },
  product_cost: { type: Number, required: true },
  product_price: { type: Number, required: true },
  product_image: { type: String, required: false, default: "ไม่มี" },
  product_unit_store: { type: Number, required: false, default: 0 },
  product_type: { type: String, required: false, default: "ไม่มี" },
  product_pay_tax: { type: Boolean, required: false, default: false }, // เป็นสินที่ ยกเว้นภาษีไหม
  product_status: { type: Boolean, required: false, default: true },
  product_note: { type: String, required: false, default: "ไม่มี" },
  product_discount: { type: Number, required: false, default: 0 },
  product_timestamp: { type: Date, required: false, default: Date.now() },
});

ProductSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "2h",
  });
  return token;
};

const Product = mongoose.model("product", ProductSchema);

const validate = (data) => {
  const schema = Joi.object({
    product_branch_id: Joi.string(),
    product_id: Joi.string(),
    product_name: Joi.string(),
    product_cost: Joi.number().precision(3).default(1),
    product_price: Joi.number().precision(3).default(1),
    product_image: Joi.string().default("ไม่มี"),
    product_unit_store: Joi.number().precision(3).default(0),
    product_type: Joi.string().default("ไม่มี"),
    product_pay_tax: Joi.boolean().default(false),
    product_status: Joi.boolean().default(true),
    product_note: Joi.string().default("ไม่มี"),
    product_discount: Joi.number().precision(3).default(0),
    product_timestamp: Joi.date().raw().default(Date.now()),
  });
  return schema.validate(data);
};

module.exports = { Product, validate };
