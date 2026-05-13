let express = require('express')

const app = express()

app.use(express.json()) // agar client side se req me bheja data dekhna hai to ye krna padega

const notes = []

app.post("/notes",(req,res)=>{
    console.log(req.body);
    notes.push(req.body)
    res.send("note created")
})

app.get("/notes",(req,res)=>{
    res.send(notes)
})

app.listen(3000,()=>{
    console.log("server is running");
    
})