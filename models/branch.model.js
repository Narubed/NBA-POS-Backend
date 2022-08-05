const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const BranchSchema = new mongoose.Schema({
  branch_owner_id: { type: String, required: true },
  branch_name: { type: String, required: false, default: "ไม่มี" },
  branch_company_name: { type: String, required: false, default: "ไม่มี" },
  branch_number: { type: Number, required: true }, // เลขที่สาขา จะไปอยู่ในเลขที่ใบเสร็จด้วย
  branch_status: { type: Boolean, required: false, default: true },
  branch_image: { type: String, required: false, default: "ไม่มี" },
});

BranchSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "2h",
  });
  return token;
};

const Branch = mongoose.model("branch", BranchSchema);

const validate = (data) => {
  const schema = Joi.object({
    branch_owner_id: Joi.string(),
    branch_name: Joi.string().default("ไม่มี"),
    branch_company_name: Joi.string().default("ไม่มี"),
    branch_number: Joi.number(),
    branch_status: Joi.boolean().default(true),
    branch_image: Joi.string().default("ไม่มี"),
  });
  return schema.validate(data);
};

module.exports = { Branch, validate };
