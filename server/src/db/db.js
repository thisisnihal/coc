import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async () => {
    try {
        const MONGODB_URI = process.env.LOCAL_MONGODB_URI;
        // const MONGODB_URI = process.env.MONGODB_URI;
        const connectionInstance = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGODB connected !! DB HOST: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.log("MONGODB connection FAILED", error);
        process.exit(1); 
    }
}

export default connectDB;