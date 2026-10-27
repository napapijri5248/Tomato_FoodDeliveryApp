import express from 'express'
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.controllers.js'
import { authMiddleware } from '../middlewares/auth.middlewares.js';
const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addToCart);
cartRouter.post('/remove', authMiddleware, removeFromCart);
cartRouter.post('/get', authMiddleware, getCart);

export { cartRouter };
