const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema(
    {
        category: { type: String },
        sub_cate_name: { type: String },
        cate_id: { type: String },
        img: { type: String },
    },
    {timestamps: true}
)

module.exports = mongoose.model("Category", CategorySchema);

