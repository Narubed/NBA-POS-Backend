const router = require("express").Router();
const ProductHistory = require("../controllers/product.history.controller");
const CreateReferenceStock = require("../controllers/product.history.controller/create.reference.stock");
const CreateReferenceCost = require("../controllers/product.history.controller/create.reference.cost");
const CreateReferencePrice = require("../controllers/product.history.controller/create.reference.price");

router.post("/", ProductHistory.create);
router.put("/:id", ProductHistory.update);
router.get("/", ProductHistory.findAll);
router.get("/:id", ProductHistory.findOne);
router.get("/branch/:id", ProductHistory.findByBranch);
router.get("/product/:id", ProductHistory.findByProduct);
router.post("/reference_stock/", CreateReferenceStock.create);
router.post("/reference_cost/", CreateReferenceCost.create);
router.post("/reference_price/", CreateReferencePrice.create);

router.delete("/:id", ProductHistory.delete);

module.exports = router;
