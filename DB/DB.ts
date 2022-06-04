import mongoose , {ConnectOptions} from "mongoose";
let MONGOOSE_URI = `mongodb+srv://${process.env.MONGOOSE_USER}:${encodeURIComponent(process.env.MONGOOSE_PASS as string)}@${process.env.MONG0OSE_HOST}?retryWrites=true&w=majority`


const connectDB = async () => {
   try {
       await mongoose.connect(MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions);
        console.log('db connected')
   } catch (error) {
       throw error;
   }
}

export {
    connectDB
}