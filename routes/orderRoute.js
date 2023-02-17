const express = require('express');
const Order = require('../models/order');
const verify = require('../verifyToken');

const router = express.Router();

router.post('/:id', verify, async (req, res) => {

    if (req.user.id === req.params.id || req.user.isAdmin) {
        const newOrder = new Order(req.body);

        try {
            const orderRes = await newOrder.save();
            res.status(200).json(orderRes);
        }
        catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can not create details  ");
    }



})


// UPDATE
router.put("/update/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {

        try {
            const updateOrder = await Order.findByIdAndUpdate(
                req.query.order_id,
                {
                    $set: req.body, 
                },
                { new: true }
            );
            res.status(200).json(updateOrder);
        }
        catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you can update only your order ");
    }
})



router.get('/:uid', async (req, res) => {

    const uid = req.params.uid;

    try {
        const orderList = await Order.find({ uid: uid });
        res.status(201).json(orderList);
    }
    catch (err) {
        res.status(500).json('error while geting details', err);
    }
})

router.delete('/delete/:order_id', async (req, res) => {

        const order_id = req.params.order_id;

        try {
            const deleteOrder = await Order.findByIdAndDelete(order_id);
            res.status(200).json({
                msg : `Order has been deleted ..... `, 
                obj:  deleteOrder
            });
        }
        catch(err) {
            res.status(500).json({ msg : "item not delting ", err: err})
        }

})



module.exports = router;