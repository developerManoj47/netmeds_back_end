const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');


router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
  })

  try {
    const user = await newUser.save()
    res.status(201).json(user)
  }
  catch (err) {
    if (err.code === 11000) {
      res.status(500).json({ error_code: "EMAIL_ALREADY_EXIST" })
    } else {
      res.status(500).json({ msg: `here is an error while creating new user`, err: err });

    }
  }
})

// LOGIN 
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if(!user) {
      res.status(401).json({ error_code: "USER_NOT_REGISTER" })
    }
    else {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
      const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

      originalPassword !== req.body.password && res.status(401).json("Wrong password or username!");

      const accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY,
        { expiresIn: "12h" }
      );

      if (originalPassword === req.body.password) {
        const { password, ...info } = user._doc;
        res.status(200).json({ ...info, accessToken });
      }
    }

  }
  catch (error) {
    // res.status(500).json({msg: "error while login user" , err: err})
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



})

module.exports = router;