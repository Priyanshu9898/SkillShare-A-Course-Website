import mongoose from "mongoose";

export const connectDB = async() => {
    
    const db = process.env.MONGO_URI

    const {connection} = await mongoose.connect(db, { useNewUrlParser: true });

    console.log(`MongoDB Connected to ${connection.host}`);


}