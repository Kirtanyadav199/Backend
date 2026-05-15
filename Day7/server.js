// server ko start krna
// db se connect krna

const mongoose = require("mongoose")
const app = require("./src/app")
const connectToDb= require("./src/config/databse")


connectToDb()

app.listen(3000,()=>{
    console.log("server is running on port 3000");
    
})