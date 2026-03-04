import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes.js';
import { userRouter } from './routes.js';
import { cartRouter } from './routes.js';
import session from 'express-session'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;
const secret = process.env.SPIRAL_SESSION_SECRET
const isProduction = process.env.NODE_ENV === 'production'
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

app.use(cors({
  origin: frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Railway
if (isProduction) {
  app.set('trust proxy', 1);
}

app.use(express.json());

// Session
app.use(session({
  secret: secret || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
  }
}))

app.use(productsRouter);
app.use(userRouter);
app.use(cartRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});