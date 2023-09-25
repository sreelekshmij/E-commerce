const express = require('express');
const connectDB = require('./db');
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');

dotenv.config()
const PORT = process.env.PORT || 8000;
connectDB()

app.use(cors());
app.use(bodyParser.json())

app.use('/v1/auth',authRouter)
app.use('/v1/users', userRouter)
app.use('/v1/products', productRouter)
app.use('/v1/cart', cartRouter)
app.use('/v1/orders', orderRouter)

app.listen(PORT, () => {
    console.log('Server is running...')
});
