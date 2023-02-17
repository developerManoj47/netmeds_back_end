const e = require('express');
const express = require('express');
const List = require('../models/List');
const verify = require('../verifyToken');

const router = express.Router();

router.post('/:id', verify, async (req, res) => {
    // const newItem = new List({
    //     category: req.body.category,
    //     sub_cate_name: req.body.sub_cate_name,
    //     cate_id: req.body.cate_id,
    //     prod_name: req.body.prod_name,
    //     cost: req.body.cost,
    //     img: req.body.img,
    // })
    // const newItem = new List(req.body)

    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            // const listItemRes = await newItem.save();
            const listItemRes = await List.insertMany(req.body);
            res.status(201).json(listItemRes);
        }
        catch (err) {
            res.status(500).json(`not posting the data`, err)
        }
    } else {
        res.status(403).json("you not create details  ");
    }


})

router.get('/', async (req, res) => {

    try {
        const list = await List.find();
        res.status(201).json(list);
    }
    catch (err) {
        res.status(500).json(` not able to get the data from DB`, err)
    }
})

router.get('/:cate_id', async (req, res) => {
    let cate_id = req.params.cate_id;
    let lcost = req.query.lcost;
    let hcost = req.query.hcost;

    let sort = req.query.sort

    // get random list 
    const category = req.query.category;
    let list = [];
    if (category) {
        try {
            if (category) {
                list = await List.aggregate([
                    { $match: { category: category } },
                    { $sample: { size: 10 } }
                ])
                res.status(200).json(list);
            } else {
                res.status(400).json({ msg: "Please provide category in the query" });
            }
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
    else if(sort){
        if(sort === "high"){
            try {
                const list = await List.find({cate_id: cate_id}).sort({cost :-1});
                res.status(201).json(list);
            }
            catch (err) {
                res.status(500).json(` not able to get the data from DB`, err)
            }
        } else {
            try {
                const list = await List.find({cate_id: cate_id}).sort({cost :1});
                res.status(201).json(list);
            }
            catch (err) {
                res.status(500).json(` not able to get the data from DB`, err)
            }
        }
    }
    else {
        let query = {}
        if (hcost & lcost) {
            query = {
                cate_id: cate_id,
                $and: [{ cost: { $gt: lcost, $lt: hcost } }]
            }
        }
        else if (cate_id) {
            query = { cate_id: req.params.cate_id }
        }
        else {
            query = {}
        }

        try {
            const list = await List.find(query);
            res.status(201).json(list);
        }
        catch (err) {
            res.status(500).json(` not able to get the data from DB`, err)
        }
    }


})


// router.get("/random" , async ( req , res ) => {



// });



module.exports = router