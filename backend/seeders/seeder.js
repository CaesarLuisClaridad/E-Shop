import mongoose from "mongoose";
import Products from "./data.js";
import Product from "../model/product.js";

const seedProducts = async () => {
  try {
    //connect to DB
    await mongoose.connect("mongodb://127.0.0.1:27017/E-Shop");

    // delete existing products
    await Product.deleteMany();
    console.log("Existing Product Deleted");

    await Product.insertMany(Products);
    console.log("New products inserted successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding products", error);
    process.exit(1);
  }
};

seedProducts();
