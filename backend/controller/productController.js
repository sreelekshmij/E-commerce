const Products = require("../models/productModel");
const User = require("../models/userModel");
// const fs = require('fs/promises');

const createProduct = async (req, res) => {
  try {
    const newProduct = new Products(req.body);
    const savedProduct = await newProduct.save();
    console.log(savedProduct)
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error,"error")
    res.status(500).json({ message: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Products.findById(req.params.id);
    const updatedStock = req.body.stock;

    if (updatedStock >= 0) {
      updatedProduct.stock = updatedStock;
      updatedProduct.inStock = updatedStock > 0;
      await updatedProduct.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(400).json({ message: "Invalid stock value" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    // console.log(req.params.id,"id")
    if (!product) {
      res.status(400).json({ message: "Bad request" });
    }
    product.isDeleted = true;
    await product.save();
    // console.log("product",product)
    res.status(200).json({ message: "Product Removed successfully" });
  } catch (error) {
    // console.log(error)
    res.status(500).json({ error: "Error in deletion" });
  }
};

//GET PRODUCT
const getProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    // console.log(user,"user")
    if (!product) {
      res.status(400).json({ message: "Bad request" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//GET ALL PRODUCTS
const getProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Products.find({ isDeleted: false })
        .sort({ _id: -1 })
        .limit(1);
    } else if (qCategory) {
      products = await Products.find({
        categories: {
          $in: [qCategory],
        },
        isDeleted: false,
      });
    } else {
      products = await Products.find({ isDeleted: false });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductCount = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.json("badRequest");
    }
    if (user.isAdmin) {
      const productCount = await Products.countDocuments({ isDeleted: false });
      // console.log(productCount, "count");
      res.status(200).json(productCount);
    }
  } catch (error) {
    res.status(500).json({ message: "invalid request" });
  }
};

const getStockTotal = async (req, res) => {
  try {
    const totalStock = await Products.aggregate([
      {
        $match: {
          inStock: true,
        },
      },
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$stock" },
        },
      },
    ]);
    res.status(200).json(totalStock[0]?.totalStock || 0);
  } catch (error) {
    res.status(500).json({ message: "Error calculating total stock" });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductCount,
  getStockTotal,
};
