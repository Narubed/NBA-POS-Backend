const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const dayjs = require("dayjs");
const {
  ReportInvoiceFull,
  validate,
} = require("../../models/report.invoice.full.model");

exports.findDate = async (req, res) => {
  console.log(req.body);

  try {
    ReportInvoiceFull.find({
      rif_branch_id: req.body.branch,
    }).then((value) => {
      if (!value) {
        res.status(404);
      } else {
        console.log("ค่าที่รีเทอนกลับมา =>>>>>>> ", value);
        const findDate = value.filter(
          (item) =>
            dayjs(item.rif_timestamp).format("MM/YYYY") ===
            dayjs(req.body.date).format("MM/YYYY")
        );
        if (findDate.length < 9) {
          res.send({
            status: true,
            invoice_full: `F${dayjs(Date.now()).format("YYYYMM")}0000${
              findDate.length + 1
            }`,
          });
        } else if (findDate.length < 99) {
          res.send({
            status: true,
            invoice_full: `F${dayjs(Date.now()).format("YYYYMM")}000${
              findDate.length + 1
            }`,
          });
        } else if (findDate.length < 999) {
          res.send({
            status: true,
            invoice_full: `F${dayjs(Date.now()).format("YYYYMM")}00${
              findDate.length + 1
            }`,
          });
        } else if (findDate.length < 9999) {
          res.send({
            status: true,
            invoice_full: `F${dayjs(Date.now()).format("YYYYMM")}0${
              findDate.length + 1
            }`,
          });
        } else if (findDate.length < 99999) {
          // res.send({
          //   status: true,
          //   invoice_full: `F${dayjs(Date.now()).format("YYYYMM")}${
          //     findDate.length + 1
          //   }`,
          // });
        }
      }
    });
    //     Report.findById(id)
    //       .then((data) => {
    //         if (!data)
    //           res
    //             .status(404)
    //             .send({ message: "ไม่สามารถหาผู้ใช้งานนี้ได้", status: false });
    //         else res.send({ data, status: true });
    //       })
    //       .catch((err) => {
    //         res.status(500).send({
    //           message: "มีบางอย่างผิดพลาด",
    //           status: false,
    //         });
    //       });
  } catch (error) {
    res.status(500).send({
      message: "มีบางอย่างผิดพลาด",
      status: false,
    });
  }
};
