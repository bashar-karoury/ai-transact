// Connect to the MongoDB database.
import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGO_URI as string, {});
    // console.log('Connected to the MongoDB database');
  } catch (error) {
    console.error("Error connecting to the MongoDB database", error);
    process.exit(1);
  }
};

export default dbConnect;
