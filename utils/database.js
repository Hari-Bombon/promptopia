import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async (db) => {
    mongoose.set('strictQuery', true);

    if(isConnected){
        console.log('MongoDb is already connected');
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbname:"share_prompt",
            useNewUrlParser:true,
            useUnifiedtopology:true,
        })

        isConnected=true;

        console.log("MongoDb connected")
    }catch(error){
        console.log(error)
    }
}