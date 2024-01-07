import mongoose from 'mongoose';

export const connectToDB = async (db) => {
    try{
        await mongoose.connect("mongodb+srv://haripriya14022003:uqvclzBloyw8q5wY@cluster0.xzgcnba.mongodb.net/shareprompt")
        
        console.log("MongoDb connected")
    }catch(error){
        console.log(error)
    }
}