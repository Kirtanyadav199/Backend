



import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
 
  const[title,setTitle] = useState('')
  const[description,setDescription] = useState('')
  const[notes,setNotes] = useState([])

  const[showEditPanel,setShowEditPanel] = useState(false)
  const[updateTitle,setUpdateTitle] = useState('')
  const[updatedescription,setUpdateDescription] = useState('')
  const[noteid,setNoteid] = useState(null)


  function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")
    .then((res)=>{
      setNotes(res.data.note)
    })
  }

  useEffect(()=>{
    fetchNotes()
  },[])


  function handleSubmit(e){
    e.preventDefault()
    axios.post("http://localhost:3000/api/notes",{
      title:title,
      description:description
    }).then((res)=>{
      console.log(res.data);
      setTitle('')
      setDescription('')
      fetchNotes()
    })

  }

  function handleDelete(noteId){
       
    axios.delete(`http://localhost:3000/api/notes/${noteId}`)
    .then((res)=>{
      fetchNotes()
    })
  }

  function openEditPanel(note){
    setShowEditPanel(true)
    setNoteid(note._id)

  }

  function saveChanges(){

    axios.patch(`http://localhost:3000/api/notes/${noteid}`,{
      title:updateTitle,
      description:updatedescription
    }).then(()=>{
      setShowEditPanel(false)
      setUpdateDescription('')
      setUpdateTitle('')
      fetchNotes()
    })
  }
 
  return (
    <>

        {/** Edit notes */}
    {showEditPanel && (
       <div className="edit-panel">
        <div className="edit-panel-content">
          <h2>Edit Note</h2>
          <input 
          type="text"
          placeholder='Update title'
          value={updateTitle}
          onChange={(e)=>{
            setUpdateTitle(e.target.value)
          }}
           />
           <input 
           type="text"
           placeholder='Update description'
           value={updatedescription}
           onChange={(e)=>{
            setUpdateDescription(e.target.value)
           }} />
           <button 
           onClick={()=>{
             saveChanges()
           }}>Save changes</button>
           <button onClick={()=>{
            setShowEditPanel(false)
           }}>Clear</button>
        </div>
       </div>
    )}


    { /* Create notes */ }
    <form onSubmit={handleSubmit}>
      <input 
      type="text"
      placeholder='Enter title'
      value={title}
      onChange={(e)=>{setTitle(e.target.value)}}
       />
       <input 
      type="text"
      placeholder='Enter description'
      value={description}
      onChange={(e)=>{setDescription(e.target.value)}}
       />
      <button>Create</button>
    </form>

    <div className="all-notes">
      {notes.map((note)=>{
        return <div className='note'>
          <h2>{note.title}</h2>
          <p>{note.description}</p>
          <button
           className='delete-btn'
            onClick={()=>{handleDelete(note._id)}}>
            Delete
            </button>
            <button 
            className='edit-btn'
            onClick={()=>{
              openEditPanel(note)
            }}>
              Edit
              </button>
        </div>
      })}
    </div>
    </>
  )
}

export default App
