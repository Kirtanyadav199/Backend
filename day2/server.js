const express = require('express')

const app = express()  // server instance create krna 

app.get('/',(req,res)=>{
    res.send("kirtan yadav")
})

app.get('/about',(req,res)=>{
    res.send("backend king")
})
app.listen(3000)  // server start krna