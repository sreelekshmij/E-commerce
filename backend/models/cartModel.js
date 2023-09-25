const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        products:[
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products'
                },
                quantity: {
                    type: Number,
                    default: 1,
                }
            }
        ],
    },
    { timestamps : true }
);

//Export the model
module.exports = mongoose.model('Cart', cartSchema);