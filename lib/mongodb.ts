import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      "mongodb+srv://maskshakill:nHb9Mzqj63LUXaYQ@cluster0.dmulrsz.mongodb.net/dev?retryWrites=true&w=majority&appName=Cluster0";

    if (mongoose.connections[0].readyState) {
      console.log("Already connected.");
      return;
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
