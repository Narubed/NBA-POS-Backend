const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
  min: 6,
  max: 30,
  lowerCase: 0,
  upperCase: 0,
  numeric: 0,
  symbol: 0,
  requirementCount: 2,
};

const EmployeeSchema = new mongoose.Schema({
  employee_name: { type: String, required: true }, //ชื่อ
  employee_email: { type: String, required: true }, //เมล
  employee_password: { type: String, required: true }, //รหัส
  employee_phone: { type: String, required: true }, //เบอร์
  employee_type: { type: String, required: false, default: "พนักงานทั่วไป" }, // พนักงานทั่วไป,พนักงานเคาน์เตอร์,ผู้จัดการ
  employee_branch_id: { type: String, required: true }, // id สาขาที่อยู่
  employee_image: { type: String, required: false, default: "ไม่มี" },
  employee_status: { type: Boolean, required: false, default: true }, // เข้าสู่ระบบได้ไหม
  employee_timestamp: { type: Date, required: false, default: Date.now() },
});

EmployeeSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "2h",
  });
  return token;
};

const Employee = mongoose.model("employee", EmployeeSchema);

const validate = (data) => {
  const schema = Joi.object({
    employee_name: Joi.string(),
    employee_email: Joi.string(),
    employee_password: passwordComplexity(complexityOptions)
      .required()
      .label("Employee_password"),
    employee_phone: Joi.string(),
    employee_type: Joi.string().default("พนักงานทั่วไป"),
    employee_branch_id: Joi.string(),
    employee_image: Joi.string().default("ไม่มี"),
    employee_status: Joi.boolean().default(true),
    employee_timestamp: Joi.date().raw().default(Date.now()),
  });
  return schema.validate(data);
};

module.exports = { Employee, validate };
