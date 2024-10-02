import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import passport from './middlewares/password.js';

const app = express()
app.set('trust proxy', true);
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.static("public"));
app.use(cookieParser());

app.use(passport.initialize());



import userRouter from "./routes/user.routes.js";
import { API_ENDPOINT } from "./constants.js";

console.log(`${API_ENDPOINT}/users`);
app.use(`${API_ENDPOINT}/users`, userRouter); 

app.get('/hi', async (req, res)=> {
    console.log("hiii");
    res.send('hiiii')
})

export { app };