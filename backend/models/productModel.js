const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
        title:{
            type:String,
            required:true,
            unique : true,
            trim: true,
        },
        desc:{
            type:String,
            required:true,
            trim: true,
        },
        img:{
            type:String,
            required:true,
        },
        categories:{
            type: String,
            required:true,
        },
        size:{
            type:String,
            trim: true,
        },
        color:{
            type:String,
            trim: true,
        },
        stock:{
            type: Number,
            required: true,
            default: 0,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
        price:{
            type:Number,
            required : true,
        },
        isDeleted:{
            type: Boolean,
            default: false
        },
    },
    { timestamps : true }
);

productSchema.pre("save", function (next) {
    if (this.stock <= 0) {
      this.inStock = false;
    } else {
      this.inStock = true;
    }
    next();
  });

//Export the model
module.exports = mongoose.model('Products', productSchema);