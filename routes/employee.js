const router = require("express").Router();
const employee = require("../controllers/employee.controller");
const createEmployee = require("../controllers/employee.controller/create.employee.controller");
const updateEmployee = require("../controllers/employee.controller/update.employee.controller");;

router.post("/", createEmployee.create);
router.put("/:id", updateEmployee.update);
router.get("/", employee.findAll);
router.get("/:id", employee.findOne);
router.get("/email/:id", employee.findByEmail);
router.delete("/:id", employee.delete);

module.exports = router;
