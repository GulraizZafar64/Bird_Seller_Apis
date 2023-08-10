const mongoose=require("mongoose")

const uri="mongodb+srv://abdulrafay9797:Eueu_6464@netflix.2a03rl4.mongodb.net/?retryWrites=true&w=majority"
const connectDatabase=( )=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(uri,{useUnifiedTopology:true,
    useNewUrlParser:true}).then((data)=>{
    console.log(`Mongodb connected with server:${data.connection.host}`);
 })
}

module.exports=connectDatabase