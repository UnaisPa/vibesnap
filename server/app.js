import express from "express";
import dotenv from "dotenv"
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import morgan from 'morgan';
import compression from 'compression';

import { notFound,errorHandler } from "./middlewares/errorMiddleware.js";

import userRouter from "./routes/userRoutes.js"

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

import dbConnect from "./config/dbConnect.js";

dbConnect();

// Core Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression()); //Reduce response size for faster load times:

// Security
app.use(helmet()); // Sets HTTP headers to improve security.
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

//Prevent injection attacks by sanitizing input.
app.use(mongoSanitize()); // Protect against NoSQL injection
app.use(xss()); // Protect against XSS attacks

// Logging
app.use(morgan('combined')); //HTTP request logging

// Rate Limiting - Prevents abuse by limiting the number of requests per IP.
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

// Define routes
// app.get('/', (req, res) => {
//     res.send('The data');
// });

app.use('/api/user',userRouter);


// Error handler middlewares
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running at port:${port}`);
});
