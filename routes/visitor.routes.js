const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const {
  createVisitor,
  getVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
  checkoutVisitor,
} = require("../controllers/visitor.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createVisitor);
router.get("/", getVisitors);
router.get("/:id", getVisitorById);
router.put("/:id", updateVisitor);
router.patch("/:id/checkout", checkoutVisitor);
router.delete("/:id", deleteVisitor);

module.exports = router;