import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import Order from "../model/order.js";
import Product from "../model/product.js";

// Create order => /api/v1/order/new
export const createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    shippingAmount,
    totalAmount,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentMethod,
    itemsPrice,
    shippingAmount,
    totalAmount,
    user: req.user._id,
    gcashPayment:
      paymentMethod === "GCASH"
        ? { receiptImage: req.body.receiptImage }
        : undefined,
  });

  res.status(200).json({
    order,
  });
});

// get current user order => /api/v1/me/order
export const myOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });
  let myOrders = orders.length;

  res.status(200).json({
    myOrders,
    orders,
  });
});

// get order details => /api/v1/order/:id
export const getOrderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 400));
  }

  res.status(200).json({
    order,
  });
});

// get All Orders - ADMIN => /api/v1/admin/orders
export const getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();
  const ordersNumber = orders.length;

  res.status(200).json({
    ordersNumber,
    orders,
  });
});

// Delete Order - ADMIN => /api/v1/admin/orders/:id
export const deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

// Update Order - ADMIN => /api/v1/admin/orders/:id
export const updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  if (order?.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  // Update GCASH payment status if provided
  if (req.body.gcashPayment?.status) {
    order.gcashPayment = order.gcashPayment || {};
    order.gcashPayment.status = req.body.gcashPayment.status;
  }

  // Update order status if provided
  if (req.body.status) {
    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  }

  // Update product stocks
  for (const item of order.orderItems) {
    const product = await Product.findById(item?.product?.toString());

    if (!product) {
      return next(new ErrorHandler("No product found with this ID", 404));
    }

    product.stock = product.stock - item.quantity;
    await product.save({ validateBeforeSave: false });
  }

  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});
