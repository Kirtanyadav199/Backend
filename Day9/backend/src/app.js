// server  banana
// server config krna 


const express = require("express")
const noteModel = require('./models/note.model')
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

app.post('/api/notes',async (req,res)=>{
    const{title,description} = req.body
    
    const note = await  noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"note created succesfully",
        note
    })
    

})

app.get('/api/notes',async (req,res)=>{
  const note = await  noteModel.find()

  res.status(200).json({
    message:"notes fetched successfully",
    note
  })
})

/**
 * - DELETE /api/notes/:id
 * - delete note with the id from req.params
 */
app.delete('/api/notes/:id',async (req,res)=>{
    const id = req.params.id
    console.log(id);
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted successfully"
    })
    
})


/**
 * - update the description of the note by id
 * - req.body = {description}
 */
app.patch('/api/notes/:id',async (req,res)=>{
    const id = req.params.id

    const {description} = req.body
   await noteModel.findByIdAndUpdate(id,{description})
    res.status(200).json({
        message:"description updated successfully"
    })
})

module.exports = app
