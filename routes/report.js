const router = require("express").Router();
const report = require("../controllers/report.controller");
const invoice_shot = require("../controllers/report.controller/invoice.shot.number");

router.post("/", report.create);
router.get("/", report.findAll);
router.get("/:id", report.findOne);
router.get("/branch/:id", report.findByBranch);
router.delete("/:id", report.delete);
router.put("/:id", report.update);
router.post("/invoice_shot", invoice_shot.findDate);
module.exports = router;
