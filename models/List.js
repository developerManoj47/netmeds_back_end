const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    category: { type: String },
    sub_cate_name: { type: String },
    cate_id: { type: String },
    prod_name: { type: String },
    cost: { type: Number},
    img: { type: String },
    prod_id: {type: Number}
})


module.exports = mongoose.model('List', ListSchema);