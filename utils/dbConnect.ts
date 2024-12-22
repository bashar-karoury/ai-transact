// Connect to the MongoDB database.
import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
    // Check if there's an existing connection
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        // Connect to the MongoDB database
        await mongoose.connect(process.env.MONGO_URI as string, {
        });
        console.log('Connected to the MongoDB database');
    } catch (error) {
        console.error('Error connecting to the MongoDB database', error);
        process.exit(1);
    }
};

export default dbConnect;
