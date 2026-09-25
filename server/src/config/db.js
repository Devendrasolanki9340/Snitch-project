







import mongoose from "mongoose"
import config from "./config.js"


export async function connectDB() {
  const mongoURi = config.MONGO_URI;

  if (!mongoURi) {
    throw new Error(
      "MONGO_URI is not defined. Add it to the .env file, for example: MONGO_URI=mongodb://127.0.0.1:27017/authentication"
    );
  }

  await mongoose.connect(mongoURi);
  console.log("MongoDB connected successfully");
}

export default  connectDB