// import dotenv from 'dotenv';

// dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import "./config/passport";
import http from 'http';

// routes 
import authRoute from './routes/auth';
import contractsRoute from './routes/contract';
import paymentRoute from './routes/payment';
import { handleWebhook } from './controllers/payment.controller';

const app = express();
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URI!)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.log(error));

const clientUrl = process.env.NODE_ENV === 'production' 
  ? 'https://lexalyze-rust.vercel.app'
  : 'http://localhost:3000';

app.use(cors({
    origin: clientUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
}));
app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false
}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({status: 'API is running'})
})

app.post(
    "/payment/webhook",
    express.raw({type:"application/json"}),
    handleWebhook
)

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI!
    }),
    cookie:{
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, //24 hours
    }
}))

// for storing session
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);

// after creating contract.ts
app.use("/contracts", contractsRoute);

// after stripe integration
app.use("/payment", paymentRoute);

server.keepAliveTimeout = 120*1000;
server.headersTimeout = 120*1000;

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, "0.0.0.0",() => {
    console.log(`Server running on port ${PORT}`);
});