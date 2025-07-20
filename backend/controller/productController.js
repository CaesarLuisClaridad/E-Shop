import Product from "../model/product.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";

// create product => api/v1/product
export const createProduct = catchAsyncError(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    product,
  });
});

// get Product => api/v1/product
export const getProducts = catchAsyncError(async (req, res) => {
  const product = await Product.find();
  let productsLength = product.length

  res.status(200).json({
    productsLength,
    product,
  });
});

// get specific product => api/v1/product/:id
export const getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    product,
  });
});

// update product = api/v1/admin/product/:id
export const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Error updating this product", 404));
  }

  product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });

  res.status(200).json({
    product,
  });
});

// delete product = api/v1/product/:id
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req?.params?.id);

  if (!product) {
    return next(new ErrorHandler("Error deleting this product", 404));
  }

  await product.deteleOne();

  res.status(200).json({
    message: "Product deleted",
  });
});
