const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const ReportInvoiceFullSchema = new mongoose.Schema({
  rif_detail: { type: Array, default: [] },
  rif_grand_total: { type: Number, required: true }, // ผลรวม
  rif_discount: { type: Number, required: true }, // ส่วนลดรวม
  // สาขา
  rif_branch_id: { type: String, required: true },
  rif_branch_name: { type: String, required: false, default: "ไม่มี" },
  rif_branch_image: { type: String, required: false, default: "ไม่มี" },
  // บริษัท
  rif_vat_name: { type: String, required: false, default: "ไม่มี" },
  rif_vat_number: { type: String, required: false, default: "ไม่มี" },
  rif_vat_phone: { type: String, required: false, default: "ไม่มี" },
  rif_address: { type: String, required: false, default: "ไม่มี" },
  // ลูกค้า
  rif_customer_name: { type: String, required: false, default: "ไม่มี" },
  rif_customer_number: { type: String, required: false, default: "ไม่มี" },
  rif_customer_phone: { type: String, required: false, default: "ไม่มี" },
  rif_customer_address: { type: String, required: false, default: "ไม่มี" },

  rif_make_list: { type: String, required: true }, // ชื่อคนทำรายการ
  rif_tax_invoice_number_shot: {
    type: String,
    required: false,
    default: "ไม่มี",
  }, // เลขที่ใบกำกับภาษีย่อ
  rif_tax_invoice_number_full: {
    type: String,
    required: false,
    default: "ไม่มี",
  }, // เลขที่ใบกำกับภาษีย่อ
  rif_money: { type: Number, required: false, default: 0 },
  rif_payment_type: { type: String, required: false, default: "เงินสด" }, // ประเภทการชำระเงิน
  rif_payment_number: { type: String, required: false, default: "ไม่มี" },
  rif_timestamp: { type: Date, required: false, default: Date.now() },
});

ReportInvoiceFullSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "2h",
  });
  return token;
};

const ReportInvoiceFull = mongoose.model(
  "report_invoice_full",
  ReportInvoiceFullSchema
);

const validate = (data) => {
  const schema = Joi.object({
    rif_detail: Joi.array(),
    rif_grand_total: Joi.number(),
    rif_discount: Joi.number(),
    rif_branch_id: Joi.string().required().label("ไม่มีไอดีสาขา"),
    rif_branch_name: Joi.string().default("ไม่มี"),
    rif_branch_image: Joi.string().default("ไม่มี"),
    rif_vat_name: Joi.string().default("ไม่มี"),
    rif_vat_number: Joi.string().default("ไม่มี"),
    rif_vat_phone: Joi.string().default("ไม่มี"),
    rif_address: Joi.string().default("ไม่มี"),

    rif_customer_name: Joi.string().default("ไม่มี"),
    rif_customer_number: Joi.string().default("ไม่มี"),
    rif_customer_phone: Joi.string().default("ไม่มี"),
    rif_customer_address: Joi.string().default("ไม่มี"),

    rif_make_list: Joi.string(),
    rif_tax_invoice_number_shot: Joi.string().default("ไม่มี"),
    rif_tax_invoice_number_full: Joi.string().default("ไม่มี"),
    rif_money: Joi.number().default(0),
    rif_payment_type: Joi.string().default("เงินสด"),
    rif_payment_number: Joi.string().default("ไม่มี"),
    rif_timestamp: Joi.date().raw().default(Date.now()),
  });
  return schema.validate(data);
};

module.exports = { ReportInvoiceFull, validate };
