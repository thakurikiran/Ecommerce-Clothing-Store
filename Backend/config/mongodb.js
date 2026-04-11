import dns from "node:dns";
import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected");
  });

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing in .env");
  }

  const mongoUri = uri.endsWith("/") ? `${uri}e-commerce` : `${uri}/e-commerce`;

  // Fix SRV DNS failures on some networks/Node setups.
  dns.setServers(["8.8.8.8", "1.1.1.1"]);

  await mongoose.connect(mongoUri, {
    family: 4,
    serverSelectionTimeoutMS: 10000,
  });
};

export default connectDB;
