import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8001, ()=>{
        console.log(`server is running at PORT ${process.env.PORT || 8001}`)
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!", err);
})

