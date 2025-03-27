const mongoose = require("mongoose")

const menuItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        require: true
    },

    ingredients:{
        type: [String],
        default:[]
    },
    is_drink:{
        type:Boolean,
        default: false
    },
    num_sales:{
        type:Number,
        default: 0
    }
})
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;