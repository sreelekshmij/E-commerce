const Order = require("../models/orderModel");
const Products = require("../models/productModel");
const User = require("../models/userModel");

const createOrder = async (req, res) => {
  const { userId, products, total, address } = req.body;
  try {
    const newOrder = new Order({
      userId: userId,
      products: products,
      total: total,
      address: address,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(400).json({ message: "Bad request" });
    }

    for (const orderItem of order.products) {
      const product = await Products.findById(orderItem.productId);
      if (product) {
        product.stock += orderItem.quantity;
        await product.save();
      }
    }
    await order.deleteOne();

    res.status(200).json({ message: "Order Removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in deletion" });
  }
};

//GET USER ORDERS
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("userId").populate("products.productId");
    console.log(order,"user")
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//GET ALL
const getAll = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId").sort({_id : -1});
    // console.log(orders,"orders")
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getOrderCount = async (req,res) => {
  try {
    const user = await User.findById(req.params.id)
    if(!user){
      res.json("badRequest")
    }
    if(user.isAdmin){
      const orderCount = await Order.countDocuments()
      // console.log(productCount, "count");
      res.status(200).json(orderCount)
    }
  } catch (error) {
    res.status(500).json({message: "invalid request"})
  }
};

const getTotalAmount = async(req,res) => {
  try{
    const totalAmount = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$total' },
        },
      },
    ]);
    // console.log(totalAmount,"totalllllll")
    res.status(200).json(totalAmount[0].totalAmount || 0);
  } catch(error) {
    res.status(500).json({ message: 'Error calculating total order amount' });
  }
}

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrder,
  getAll,
  getOrderCount,
  getTotalAmount
};
