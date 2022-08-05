const router = require("express").Router();
const product = require("../controllers/product.controller");
const createProduct = require("../controllers/product.controller/create.product.controller");
const updateProduct = require("../controllers/product.controller/update.product.controller");

router.post("/", createProduct.create);
router.put("/:id", updateProduct.update);
router.get("/", product.findAll);
router.get("/:id", product.findOne);
router.get("/email/:id", product.findByBranch);
router.delete("/:id", product.delete);

module.exports = router;
