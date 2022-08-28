const router = require("express").Router();
const report = require("../controllers/report.invoice.full.controller");
const invoice_full = require("../controllers/report.invoice.full.controller/invoice.full.number");

router.post("/", report.create);
router.get("/", report.findAll);
router.get("/:id", report.findOne);
router.get("/branch/:id", report.findByBranch);
router.delete("/:id", report.delete);
router.put("/:id", report.update);
router.post("/invoice_full/", invoice_full.findDate);

module.exports = router;
