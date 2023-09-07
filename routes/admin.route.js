const express = require("express");
const adminController = require("../controllers/api/admin.controller");
const ProductApiControllers = require("../controllers/api/product.controller");
const userController = require("../controllers/api/user.controller");

const checkRoleMiddleware = require("../middleware/check-role");

const router = express.Router();

router.get(
  "/all-user",
  checkRoleMiddleware.checkRoleAdmin,
  adminController.getAllUser
);

router.get(
  "/all_user/:id",
  checkRoleMiddleware.checkRoleUser,
  userController.getUserById
);

router.get(
  "/all-review",
  checkRoleMiddleware.checkRoleAdmin,
  adminController.getAllReview
);

router.get(
  "/all-product",
  checkRoleMiddleware.checkRoleAdmin,
  adminController.getAllProduct
);

router.patch(
  "/update-product/:id",
  checkRoleMiddleware.checkRoleAdmin,
  ProductApiControllers.updateById
);

router.delete(
  "delete-product/:id",
  checkRoleMiddleware.checkRoleAdmin,
  ProductApiControllers.softDeleteById
);

router.patch(
  "/update-user",
  checkRoleMiddleware.checkRoleAdmin,
  adminController.updateUser
);

router.delete(
  "/delete-user",
  checkRoleMiddleware.checkRoleAdmin,
  adminController.deleteUserById
);

router.patch(
  "/update-feedback",
  checkRoleMiddleware.checkRoleAdmin,
  adminController.updateFeedback
);

router.delete(
  "/delete-feedback",
  checkRoleMiddleware.checkRoleAdmin,
  adminController.deleteFeedbackById
);

router.patch(
  "/update-bill-status",
  checkRoleMiddleware.checkRoleAdmin,
  adminController.updateBillStatus
);

module.exports = router;
