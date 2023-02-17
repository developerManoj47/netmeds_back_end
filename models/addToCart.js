const mongoose = require('mongoose');

const AddToCartSchema = new mongoose.Schema({
    category: { type: String },
    sub_cate_name: { type: String },
    cate_id: { type: String },
    prod_name: { type: String },
    company_name : { type: String , default: ""},
    cost: { type: Number},
    img: { type: String },
    prod_id: {type: Number},
    uid: { type: String, required: true},
    qty: { type : Number , default: 1 }
})


module.exports = mongoose.model('AddToCart', AddToCartSchema);




