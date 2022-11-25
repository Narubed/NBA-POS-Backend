const router = require("express").Router();
const { Owners } = require("../models/owner.model");
const { Employee } = require("../models/employee.model");
const { Branch } = require("../models/branch.model");
const dayjs = require("dayjs");
const bcrypt = require("bcrypt");
const Joi = require("joi");
require("dotenv").config();
// partner_username
// emp_password

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let member = await Owners.findOne({
      owner_email: req.body.email,
    });
    if (!member) {
      // หาไม่เจอ
      const employee = await Employee.findOne({
        employee_email: req.body.email,
      });
      if (!employee) {
        // หาไม่เจอ
        return res.status(401).send({
          message: "อีเมลหรือรหัสผ่านผิด",
          status: false,
        });
      }
      const token = employee.generateAuthToken();

      const validPasswordEmployee = await bcrypt.compare(
        req.body.password,
        employee.employee_password
      );
      if (!validPasswordEmployee)
        // รหัสไม่ตรง
        return res.status(401).send({
          message: "อีเมลหรือรหัสผ่านผิด",
          status: false,
        });
      const findBranch = await Branch.find({
        _id: employee.employee_branch_id,
        branch_status: true,
      });
      // สถานะสาขา
      if (findBranch.length === 0 || !findBranch) {
        return res.status(401).send({
          message: "อีเมลหรือรหัสผ่านผิด",
          status: false,
        });
      }
      const newEmployee = {
        token: token,
        _id: employee._id,
        name: employee.employee_name,
        phone: employee.employee_phone,
        type: "employee",
        type_detail: employee.employee_type,
        branch: findBranch[0]._id,
        status: employee.employee_status,
      };
      return res.status(200).send({
        token: token,
        message: "logged in successfully",
        status: "ok",
        user: newEmployee,
      });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      member.owner_password
    );
    if (!validPassword)
      return res.status(401).send({
        message: "อีเมลหรือรหัสผ่านผิด",
        status: false,
      });
    const findBranch = await Branch.find({
      branch_owner_id: member._id,
      branch_status: true,
    });
    console.log(findBranch);
    const findByDateEnd = findBranch.filter(
      (item) =>
        dayjs(item.branch_date_end).format() > dayjs(req.body.date).format()
    );
    console.log(findByDateEnd);
    if (findByDateEnd.length === 0 || !findByDateEnd) {
      return res.status(401).send({
        message: "อีเมลหรือรหัสผ่านผิด",
        status: false,
      });
    }

    const token = member.generateAuthToken();

    const newUser = {
      token: token,
      _id: member._id,
      name: member.owner_name,
      phone: member.owner_phone,
      type: "owner",
      type_detail: "owner",
      branch: findByDateEnd[0]._id,
      status: member.owner_status,
    };
    res.status(200).send({
      token: token,
      message: "logged in successfully",
      status: "ok",
      user: newUser,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().label("email"),
    password: Joi.string().required().label("password"),
    date: Joi.date().required().label("date"),
  });
  return schema.validate(data);
};

module.exports = router;
