const router = require("express").Router();
const report = require("../controllers/report.controller");

router.post("/", report.create);
router.get("/", report.findAll);
router.get("/:id", report.findOne);
router.get("/owner/:id", report.findByBranch);
router.delete("/:id", report.delete);
router.put("/:id", report.update);

module.exports = router;
