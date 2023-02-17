const express = require('express');
const  verify  = require('../verifyToken');
const Category = require('../models/Category');

const router = express.Router();


router.post('/:id',verify , async (req ,res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        const newCategory = new Category({
            category: req.body.category,
            sub_cate_name: req.body.sub_cate_name,
            cate_id: req.body.cate_id,
            img: req.body.img,
        })

        try{
            const categoryRes = await newCategory.save();
            res.status(201).json(categoryRes)
        }
        catch(err){
            res.status(500).json(`here is an error while adding new user `, err);
        }
       
    } else {
        res.status(403).json("you can update only your account ");
    }
})

router.get('/', async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(201).json(categories);
    }
    catch(err) {
        res.status(500).json(`error while getting the category data `, err);
    }
})


module.exports = router