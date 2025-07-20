import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, "Please enter your address"]
        },
        city: {
            type: String,
            required: [true, "Please enter your city"]
        },
        phoneNo: {
            type: Number,
            required: [true, "Please enter your phone number"]
        },
        postalCode: {
            type: String,
            required: [true, "Please enter your postal code"]
        },
        country: {
            type: String,
            required: [true, "Please enter your country"]
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
        },
    ],
    paymentMethod: {
        type: String,
        required: [true, "Please select a payment method"],
        enum: {
            values: ["COD", "GCASH"],
            message: "Please select a payment method"
        }
    },
    gcashPayment: {
        receiptImage: {
            type: String,
            required: function () {
                return this.paymentMethod === "GCASH";
            }
        },
        status: {
            type: String,
            required: function () {
                return this.paymentMethod === "GCASH";
            },
            enum: ["Pending", "Approved", "Reject"],
            default: function () {
                return this.paymentMethod === "GCASH" ? "Pending" : undefined;
            }
        }
    },
    itemsPrice: {
        type: Number,
        required: true
    },
    shippingAmount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: {
            values: ["Processing", "Shipped", "Delivered"],
            message: "Please select order status"
        },
        default: "Processing"
    },
    deliveredAt: Date
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
