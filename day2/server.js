const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server running");
});

app.get("/home",(req,res)=>{
    res.send("This is home page")
})
app.get("/about",(req,res)=>{
    res.send("This is about page")
})
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);  
});