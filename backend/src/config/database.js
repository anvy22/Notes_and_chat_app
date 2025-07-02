import mongoose from "mongoose";

export const connectDB = async()=>{
   try{
      const conn = await mongoose.connect(process.env.MONGO_URL);
      console.log(`connected successfully to ${conn.connection.host}`);
   }catch(err){
    console.log(err);
    process.exit(1);
   }
}