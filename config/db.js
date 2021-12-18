const mongoose=require("mongoose")
function connectDB() {
    mongoose.connect(url, {
        useNewUrlParser:true,
    })
    const connect = mongoose.connection;
    
}