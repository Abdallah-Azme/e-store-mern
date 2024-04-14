import mongoose from "mongoose";
export const connectToDB = async () => {
  try {
    if (!process.env.DATABASE_URI) {
      throw new Error("Cannot read the database environment");
    }
    await mongoose.connect(process.env.DATABASE_URI);
    console.info("Connected to db successfully");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
