const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const ProductHistorySchema = new mongoose.Schema({
  pdh_branch_id: { type: String, required: true },
  pdh_product_id: { type: String, required: true },
  pdh_type: { type: String, required: false, default: "stock" }, // stock cost price
  pdh_channel: { type: String, required: false, default: "ขาย (ธรรมดา)" }, // ปรับสต๊อก
  pdh_reference: { type: String, required: true }, // เลขอ้างอิง
  pdh_old_number: { type: Number, required: true },
  pdh_type_number: { type: String, required: false, default: "ลบ" },
  pdh_change_number: { type: Number, required: true },
  pdh_new_number: { type: Number, required: true },
  pdh_make_list: { type: String, required: true },
  pdh_timestamp: { type: Date, required: false, default: Date.now() },
});

ProductHistorySchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "2h",
  });
  return token;
};

const ProductHistory = mongoose.model("product_history", ProductHistorySchema);

const validate = (data) => {
  const schema = Joi.object({
    pdh_branch_id: Joi.string(),
    pdh_product_id: Joi.string(),
    pdh_type: Joi.string().default("stock"),
    pdh_channel: Joi.string().default("ขาย (ธรรมดา)"),
    pdh_reference: Joi.string(),
    pdh_old_number: Joi.number().precision(3),
    pdh_change_number: Joi.number().precision(3),
    pdh_new_number: Joi.number().precision(3),
    pdh_type_number: Joi.string().default("ลบ"),
    pdh_make_list: Joi.string(),
    pdh_timestamp: Joi.date().raw().default(Date.now()),
  });
  return schema.validate(data);
};

module.exports = { ProductHistory, validate };
