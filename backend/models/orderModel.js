const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
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
        total: {
            type: Number,
            required : true
        },
        address: {
            type: String,
            required : true,
            trim: true
        },
    },
    { timestamps : true }
);

//Export the model
module.exports = mongoose.model('Order', orderSchema);