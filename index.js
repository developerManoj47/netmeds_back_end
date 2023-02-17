const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
var cors = require('cors')

// import router 
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const categoryRoute = require('./routes/categories');
const listRoute = require('./routes/lists');
const detailsRoute = require('./routes/detailsRoute');
const orderRoute = require('./routes/orderRoute');
const addToCartRoute = require('./routes/addToCartRoute');
const paytmRoute = require('./routes/paytmRoute');
// const manojRoute = require('./routes/manojRoute')


dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// database connection
const mongoURL = process.env.MONGO_URL

mongoose.set('strictQuery', false);
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log(`DB connenction succefully`))
  .catch((err) => console.log(`db connenction error`,err))


app.use(express.json());
app.use(cors())

// use all routes 
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use('/api/category', categoryRoute);
app.use('/api/list', listRoute);
app.use('/api/details', detailsRoute);
app.use('/api/order', orderRoute);
app.use('/api/cart', addToCartRoute);
app.use('/api/payment', paytmRoute);

// console.log(process.env.PAYTM_MERCHENT_ID)
// console.log(process.env.PAYTM_MERCHENT_KEY)
// console.log(process.env.PAYTM_WEBSITE)


app.get('/', (req, res) => {
    res.status(200).json({ msg: "this is home page " });
})

app.listen(8000, () => {
    console.log("The port is runing on port 8000");
})