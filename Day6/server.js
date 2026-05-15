// server start krna
// DB se connect krna
require("dotenv").config();

const app = require("./src/app")
const mongoose = require("mongoose")


function connectDB(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("Connected to Database");
        
    })
}

connectDB()

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})

