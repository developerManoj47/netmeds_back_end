const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    total_payment: { type: Number },
    total_item: { type: Number },
    phone: { type: Number },
    email: { type: String },
    name: { type: String },
    uid: { type: String},
    order_id: { type: String, default: "" },
    delivery_date: { type: String , default: ""},
    status: {type: String , default: ""},
    bank_name: {type: String, default: ""}
})


module.exports = mongoose.model('Order', OrderSchema);