const router = require("express").Router();
const sales = require("../controllers/sales.controller");

router.post("/branch", sales.findByBranch);

module.exports = router;
