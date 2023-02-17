const mongoose = require('mongoose');

const newDetail = new mongoose.Schema({
    category: { type: String },
    sub_cate_name: { type: String },
    cate_id: { type: String },
    prod_name: { type: String },
    company_name : { type: String},
    cost: { type: Number},
    img: { type: String },
    prod_id: {type: Number}
})


module.exports = mongoose.model("Detail", newDetail);