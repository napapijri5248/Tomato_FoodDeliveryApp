import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import fs from 'fs'
import { connectDB } from './config/db.js';
import { foodRouter } from './routes/foodRoute.routes.js';
import { userRouter } from './routes/userRoute.routes.js';
import { cartRouter } from './routes/cartRoute.routes.js';
import { orderRouter } from './routes/orderRoute.routes.js';

// app config
const app=express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use(cors())

// connect to database
connectDB();

// ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// api endpoints
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send('API WORKING')
})

// run the server
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    
})
