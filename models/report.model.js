const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const ReportSchema = new mongoose.Schema({
  //   report_product_id: { type: String, required: true },
  //   report_product_name: { type: String, required: true },
  //   report_product_amount: { type: Number, required: true },
  //   report_product_cost: { type: Number, required: true },
  //   report_product_price: { type: Number, required: true },
  report_detail: { type: Array, default: [] },
  report_grand_total: { type: Number, required: true }, // ผลรวม
  report_discount: { type: Number, required: true }, // ส่วนลดรวม
  report_branch_id: { type: String, required: true },
  report_vat_name: { type: String, required: false, default: "ไม่มี" },
  report_vat_number: { type: String, required: false, default: "ไม่มี" },
  report_address: { type: String, required: false, default: "ไม่มี" },
  report_make_list: { type: String, required: true }, // ชื่อคนทำรายการ
  report_tax_invoice_number: { type: Number, required: true }, // เลขใบกำกับภาษี
  report_payment_type: { type: String, required: false, default: "เงินสด" }, // ประเภทการชำระเงิน
  report_timestamp: { type: Date, required: false, default: Date.now() },
});

ReportSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "2h",
  });
  return token;
};

const Report = mongoose.model("report", ReportSchema);

const validate = (data) => {
  const schema = Joi.object({
    report_detail: Joi.array(),
    report_grand_total: Joi.number(),
    report_discount: Joi.number(),
    report_branch_id: Joi.string().required().label("ไม่มีไอดีสาขา"),
    report_vat_name: Joi.string().default("ไม่มี"),
    report_vat_number: Joi.string().default("ไม่มี"),
    report_address: Joi.string().default("ไม่มี"),
    report_make_list: Joi.string(),
    report_tax_invoice_number: Joi.number(),
    report_payment_type: Joi.string().default("เงินสด"),
    report_timestamp: Joi.date().raw().default(Date.now()),
  });
  return schema.validate(data);
};

module.exports = { Report, validate };
