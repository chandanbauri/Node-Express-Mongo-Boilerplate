import mongoose from "mongoose";
const MONGOOSE_URI = `mongodb://${
  process.env.MONGOOSE_USER
}:${encodeURIComponent(process.env.MONGOOSE_PASS as string)}@${
  process.env.MONG0OSE_HOST
}?ssl=true&replicaSet=atlas-f99oxo-shard-0&authSource=admin&retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGOOSE_URI, {
      dbName: "test",
    });
    console.log("db connected");
  } catch (error) {
    throw error;
  }
};

export { connectDB };
