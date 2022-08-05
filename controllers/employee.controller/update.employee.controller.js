const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require("fs");
const { Employee, validate } = require("../../models/employee.model");
const { google } = require("googleapis");
const CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_DRIVE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_DRIVE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_DRIVE_REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

exports.update = async (req, res) => {
  console.log("UPDATE")
  try {
    let upload = multer({ storage: storage }).single("employee_image");
    upload(req, res, async function (err) {
      console.log(req.file);

      if (!req.file) {
        if (!req.body) {
          return res.status(400).send({
            message: "ส่งข้อมูลผิดพลาด",
          });
        }
        const id = req.params.id;
        if (!req.body.employee_password) {
          Employee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then((data) => {
              if (!data) {
                res.status(404).send({
                  message: `ไม่สามารถเเก้ไขผู้ใช้งานนี้ได้`,
                  status: false,
                });
              } else
                res.send({
                  message: "แก้ไขผู้ใช้งานนี้เรียบร้อยเเล้ว",
                  status: true,
                });
            })
            .catch((err) => {
              res.status(500).send({
                message: "มีบ่างอย่างผิดพลาด" + id,
                status: false,
              });
            });
        } else {
          const salt = await bcrypt.genSalt(Number(process.env.SALT));
          const hashPassword = await bcrypt.hash(
            req.body.employee_password,
            salt
          );
          Employee.findByIdAndUpdate(
            id,
            { ...req.body, employee_password: hashPassword },
            { useFindAndModify: false }
          )
            .then((data) => {
              if (!data) {
                res.status(404).send({
                  message: `ไม่สามารถเเก้ไขผู้ใช้งานนี้ได้`,
                  status: false,
                });
              } else
                res.send({
                  message: "แก้ไขผู้ใช้งานนี้เรียบร้อยเเล้ว",
                  status: true,
                });
            })
            .catch((err) => {
              res.status(500).send({
                message: "ไม่สามารถเเก้ไขผู้ใช้งานนี้ได้",
                status: false,
              });
            });
        }
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      } else {
        uploadFile(req, res);
      }
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};
async function uploadFile(req, res) {
  const filePath = req.file.path;
  let fileMetaData = {
    name: req.file.originalname,
    parents: ["14dSu-tWK9UIMKLRSZkuX5JTKi5kwRaDi"],
  };
  let media = {
    body: fs.createReadStream(filePath),
  };
  try {
    const response = await drive.files.create({
      resource: fileMetaData,
      media: media,
    });
    generatePublicUrl(response.data.id);
    const id = req.params.id;

    if (!req.body.employee_password) {
      Employee.findByIdAndUpdate(
        id,
        { ...req.body, employee_image: response.data.id },
        { useFindAndModify: false }
      )
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`,
            });
          } else res.send({ message: "Employee was updated successfully." });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Employee with id=" + id,
          });
        });
    } else {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.employee_password, salt);

      Employee.findByIdAndUpdate(
        id,
        {
          ...req.body,
          employee_image: response.data.id,
          employee_password: hashPassword,
        },
        { useFindAndModify: false }
      )
        .then((data) => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Employee with id=${id}. Maybe Employee was not found!`,
            });
          } else res.send({ message: "Employee was updated successfully." });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error updating Employee with id=" + id,
          });
        });
    }
  } catch (error) {
    console.log(error.massage);
  }
}
async function generatePublicUrl(res) {
  try {
    const fileId = res;
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink",
    });
  } catch (error) {
    console.log(error.message);
  }
}
