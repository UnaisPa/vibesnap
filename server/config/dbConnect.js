import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const uri = process.env.MONGO_URI;
//const uri = 'mongodb://user2025:test20252@vibesnapcluster-shard-00-00.qhofy.mongodb.net:27017,vibesnapcluster-shard-00-01.qhofy.mongodb.net:27017,vibesnapcluster-shard-00-02.qhofy.mongodb.net:27017/vibesnapDB?ssl=true&replicaSet=atlas-d9mpd5-shard-0&authSource=admin&retryWrites=true';
// console.log(uri)

const dbConnect = async () => {
    try {
        await mongoose.connect(uri).then(() => {
            console.log('MongoDB connected');
        }).catch((err) => {
            console.log('MongoDB connection failed :', err);
        })
    } catch (err) {
        console.log(err);
    }
}

export default dbConnect