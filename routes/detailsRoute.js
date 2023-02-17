const express = require('express');
const Detail = require('../models/details');
const verify = require('../verifyToken');

const router = express.Router();

router.post('/:id', verify, async (req , res ) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
           const detailsRes = await Detail.insertMany(req.body);
            res.status(200).json(detailsRes);
        }
        catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you not create details  ");
    }
})



router.get('/:prod_id',async (req, res) => {

    const prodId = req.params.prod_id;
    const cateId = req.query.cate_id;

    let query = {}
    if(cateId){
        query = {
            cate_id: cateId,
            prod_id: prodId
        }
    }
    else if(prodId){
        query = {
            prod_id: prodId
        }
    } else {
        query = {}
    }


    try{
        const aboutProduct = await Detail.find(query) ;
        res.status(201).json(aboutProduct);
    }
    catch(err){
        res.status(500).json('error while geting details' , err);
    }
})

// router.get('/:id',async (req, res) => {

//     const prod_id = req.params.id;

//     try{
//         const aboutProduct = await Detail.find({prod_id: prod_id}) ;
//         res.status(200).json(aboutProduct);
//     }
//     catch(err){
//         res.status(500).json(`error while geting the details `, err);
//     }
// })




module.exports = router;