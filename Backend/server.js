import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to DB and Cloudinary
(async () => {
  try {
    await connectDB();
    await connectCloudinary();
    console.log('Connected to MongoDB and Cloudinary successfully');
  } catch (error) {
    console.error('Error connecting to services:', error.message);
    process.exit(1); // Exit if connections fail
  }
})();

// API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Health Check Route
app.get('/', (req, res) => {
  res.send('API Working');
});

// Export the app for Vercel
export default app;
