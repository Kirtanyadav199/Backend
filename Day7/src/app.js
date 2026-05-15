// server banana
// server config krna

const noteModel =   require('./models/notes.model')

const express = require("express")
require('dotenv').config()


const app = express()
app.use(express.json())

// POST notes
app.post("/notes",async (req,res)=>{ 
    const{title,description} = req.body

  const note = await noteModel.create({
    title,description
})


  res.status(201).json({
    message:"note created successfully",
    note

  })

})

module.exports = app