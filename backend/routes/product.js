import express from 'express'
import { createProduct, deleteProduct, getProductDetails, getProducts, updateProduct } from "../controller/productController.js";

const router = express.Router();

router.route("/product")
      .post(createProduct)
      .get(getProducts)

router.route("/product/:id").get(getProductDetails)

router.route("/admin/product/:id")
      .put(updateProduct)
      .delete(deleteProduct)


export default router;