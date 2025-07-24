import express from 'express'
import { isAuthenticatedUser } from '../middleware/authMiddleware.js';
import { authorizedRoles } from '../middleware/authMiddleware.js';
import { createProduct, deleteProduct, getProductDetails, getProducts, updateProduct } from "../controller/productController.js";

const router = express.Router();

router.route("/product")
      .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct)
      .get(getProducts)

router.route("/product/:id").get(getProductDetails)

router.route("/admin/product/:id")
      .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
      .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)


export default router;