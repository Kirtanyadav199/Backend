const mongoose = require("mongoose")


function connectToDb(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connect to DB");
        
    })
}

module.exports = connectToDb