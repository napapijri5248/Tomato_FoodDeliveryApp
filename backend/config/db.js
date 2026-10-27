import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() =>
            console.log('MongoDB connected')
        );
    } catch (error) {
        console.log('MongoDB connection failed...');
        console.log(error);


    }
}
export { connectDB }
