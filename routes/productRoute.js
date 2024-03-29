const express = require("express");
const {
  createProduct,
  getAProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  addToCompare,
  rating,
  uploadImages,
} = require("../controller/productCtrl");
const {isAdmin, authMiddleware} = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/:id", getAProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/compare", authMiddleware, addToCompare);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProduct);

module.exports = router;
