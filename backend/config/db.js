import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "mern_auth_DB",
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Failed to connect DB", err);
  }
};

export default connectDB;
