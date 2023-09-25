const Cart = require('../models/cartModel');
const Products = require('../models/productModel');

const createCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: userId })
        
        if (!cart) {
            cart = new Cart({ userId });
        }

        const existingProductIndex = cart.products.findIndex(
            (product) => product.productId.toString() == productId
        );

        if (existingProductIndex !== -1) {
            const existingProduct = cart.products[existingProductIndex];
            
            if (existingProduct.quantity + quantity > existingProduct.productId.stock) {
                return res.status(400).json({ message: "Not enough stock available" });
            }

            existingProduct.quantity += quantity;
        } else {
            const product = await Products.findById(productId);

            if (!product || !product.inStock || product.stock < quantity) {
                return res.status(400).json({ message: "Product not found or not enough stock available" });
            }

            cart.products.push({ productId, quantity });
        }

        const productToUpdate = await Products.findById(productId);
        productToUpdate.stock -= quantity;
        await productToUpdate.save();

        await cart.save();
        res.status(200).json({ message: "Item added to cart successfully", cart });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};


const updateCart = async (req , res) => {
    try{
        const {productId,quantity} = req.body;
        // console.log(req.user, req.params, "check req");
        let updatedCart = await Cart.findOne({userId: req.params.userId})
        // console.log(updatedCart.products,"prooooo")
        const existingProduct = updatedCart.products.find(
            (product) => product.productId == productId
        );
        // console.log(existingProduct,"exisingggg")
        if(existingProduct) {       
            existingProduct.quantity -= quantity;
        }
        if(existingProduct.quantity === 0){
            updatedCart.products.remove(existingProduct)
        }

        const productToUpdate = await Products.findById(productId);
            productToUpdate.stock += quantity;
            await productToUpdate.save();
        
        await updatedCart.save()
        // console.log(updatedCart,"update")
        res.status(200).json({ message: "Cart updated Successfully" });
    } catch(error) {
        res.status(500).json({message: error})
    }
}

const deleteCart = async (req, res) => {
    try{
        const cart = await Cart.findOne({userId: req.params.userId})
        if(!cart){
            res.status(400).json({message: "Bad request"})
        }
        cart.products.splice(0,cart.products.length)
        await cart.save()
        // console.log(cart,"user")
        res.status(200).json({message: "Cart Removed successfully"})
    } catch (error){
        console.log(error)
        res.status(500).json({error: "Error in deletion"})
    }
}

//GET USER CART
const getCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId')
    //   console.log(cart,"user")
      res.status(200).json(cart);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  
  //GET ALL
  const getAll = async (req, res) => {
    try {
      const carts = await Cart.find({ isDeleted: false})
      res.status(200).json(carts)
    } catch (error) {
      res.status(500).json(error);
    }
  };

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCart,
    getAll,
}