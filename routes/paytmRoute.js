const express = require('express');
const PaytmChecksum = require('../paytm/PaytmChecksum')
const paytm_conf = require('../paytm/paytm.Config');
const verify = require('../verifyToken');
const axios = require('axios');

const router = express.Router();


router.post('/paytm', async (req, res) => {



  try {
    const { amount, name, phone_number, email, orderID, number } = req.body;

    const txnAmount = JSON.stringify(amount)
    const phoneNumber = JSON.stringify(phone_number);

    
    const order_id = orderID;
    const user_name = name + number;

    // console.log(paytm_conf.merchent_id)
    // console.log(paytm_conf.merchent_key)


    let params = {}
    params['MID'] = paytm_conf.merchent_id,
    params['WEBSITE'] = paytm_conf.website,
    params['CHANNEL_ID'] = "WEB",
    params['INDUSTRY_TYPE-ID'] = 'RETAIL',
    params['ORDER_ID'] = order_id,
    params['COST_ID'] = user_name ,
    params['TXN_AMOUNT'] = txnAmount,
    params['EMAIL'] = email,
    params['MOBILE_NO'] = phoneNumber,
    params['CALLBACK_URL'] = process.env.NODE === "DEV" ? 'http://localhost:3000/vieworders' : 'https://netmeds-clone.netlify.app/vieworders',
    params['EMAIL'] = email;


    let paytmChecksum = PaytmChecksum.generateSignature(params, paytm_conf.merchent_key)
    paytmChecksum.then((checksum) => {
        let paytmParams = {
          ...params,
          checksum : checksum
        }

        res.status(201).json(paytmParams);
      }).catch((err) => {
        res.status(400).json(err)
      });

  } catch (error) {
    // console.log(error)
    // console.log(error.message)
    // res.status(500).json({msg : "paytm error ",err: error.message})
    if (error.response) {
      res.status(500).json({
        msg: "paytm response ERROR",
        err: error
      });
    }
    else if (error.request) {
      res.status(500).json({
        msg: "paytm request ERROR",
        err: error
      });
    }
    else {
      res.status(500).json({
        msg: "paytm axios call fail",
        err: error
      });
    }
  }


});



// router.post('/paytm/callback', verify , (req, res) => {
//     // verify paytm checksum fucntion 
//     PaytmChecksum.verifychecksum(req.body, Paytm_Conf.merchent_key, (err, result) => {
//         if (result) {
//             // update order status in your database
//             console.log('Transaction successful');
//         } else {
//             // handle error
//             console.log('Transaction failed');
//         }
//     });
// });




module.exports = router

