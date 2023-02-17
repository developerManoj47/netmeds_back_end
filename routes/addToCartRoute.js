const express = require('express');
const AddToCart = require('../models/addToCart');
const verify = require('../verifyToken');

const router = express.Router();

router.post('/addincart/:id', verify, async (req, res) => {

    if (req.user.id === req.params.id || req.user.isAdmin) {
        const newCart = new AddToCart(req.body);

        try {
            const cartRes = await newCart.save();
            res.status(200).json(cartRes);
        }
        catch(err){
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can not add cart item  ");
    }



})

router.get('/:uid', async (req, res) => {

    const uid = req.params.uid;

    try {
        const cartList = await AddToCart.find({ uid: uid });
        res.status(201).json(cartList);
    }
    catch (err) {
        res.status(500).json('error while geting cart', err);
    }
})

// UPDATE
router.put("/update/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        
        try {
            const updateCart = await AddToCart.findByIdAndUpdate(
                req.query.cart_id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updateCart);
        }
        catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can update this cart  ");
    }
})

router.delete('/delete/:cart_id', async (req, res) => {

    const cart_id = req.params.cart_id;

    try {
        const deleteOrder = await AddToCart.findByIdAndDelete(cart_id);
        res.status(200).json({
            msg : `cart has been deleted ..... `, 
            obj:  deleteOrder
        });
    }
    catch(err) {
        res.status(500).json({ msg : "item not delting ", err: err})
    }

})



module.exports = router;