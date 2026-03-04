import express from 'express'
import { getProducts, getGenres } from './productControllers.js'
import { signupUser, loginUser, getMe, logoutUser } from './authControllers.js'
import { getCart, addToCart, updateCartQuantity, removeFromCart, clearCart } from './cartControllers.js'

export const productsRouter = express.Router()

export const userRouter = express.Router()

export const cartRouter = express.Router()

productsRouter.get('/api/genres', getGenres)
productsRouter.get('/api/products', getProducts)
userRouter.post('/api/signup', signupUser);
userRouter.post('/api/login', loginUser);
userRouter.get('/api/me', getMe);
userRouter.post('/api/logout', logoutUser);

cartRouter.get('/api/cart', getCart);
cartRouter.post('/api/cart/add', addToCart);
cartRouter.post('/api/cart/update', updateCartQuantity);
cartRouter.post('/api/cart/remove', removeFromCart);
cartRouter.post('/api/cart/clear', clearCart);
