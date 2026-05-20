import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const[notes,setNotes]= useState([])

  const[showModal,setShowModal] = useState(false)
  
  const[updatedTitle,setUpdatedTitle] = useState("")
  const[updatedDescription,setUpdatedDescription] = useState("")

  const[selectedNote,setSelectedNote] = useState(null)
  
 
  
  function fetchNotes(){
    axios.get('http://localhost:3000/api/notes')
   .then((res)=>{
    setNotes(res.data.note)
   })
  }

  useEffect(()=>{
    fetchNotes()
  },[])
   

  function handleSubmit(e){

    e.preventDefault();
    const {title,description} = e.target.elements

    console.log(title.value,description.value);

    axios.post("http://localhost:3000/api/notes",{
      title:title.value,
      description:description.value
    }).then(res=>{
      console.log(res.data);
      fetchNotes()
      
    })
    
    
  }

  function handleDeleteNote(noteId){
   axios.delete("http://localhost:3000/api/notes/"+noteId)
   .then(res=>{
    console.log(res.data);
    fetchNotes()
   })
    
  }

  function openEditModal(note){
    setShowModal(true)
   
    setSelectedNote(note)
       
    //  setUpdatedTitle(note.title)
    //  setUpdatedDescription(note.description)


  }

  
  function saveChanges(){

    axios.patch(`http://localhost:3000/api/notes/${selectedNote._id}`,{
      title:updatedTitle,
      description:updatedDescription
    }).then((res)=>{
      console.log(res.data);
      fetchNotes()
      setShowModal(false)
      
    })
  }

  return (
    <>

    {
      showModal &&(
        <div className='modal'>
             <div className="modal-content">
              <h2>Edit Note</h2>
               
               <input 
               type="text" 
               placeholder='Update Title'
               value={updatedTitle}
               onChange={(e)=>{ setUpdatedTitle(e.target.value)}}
               />

               <input 
               type="text"
               placeholder='Update description'
               value={updatedDescription}
               onChange={(e)=>{setUpdatedDescription(e.target.value)}}
                />

                <button onClick={saveChanges} >
                  Save Changes
               </button>

               <button onClick={()=>{
                setShowModal(false)
               }}>Cancle</button>
             </div>
        </div>
      )
    }








    <form className='note-create-form' onSubmit={handleSubmit}>
       <input name='title' type="text" placeholder='Enter title'/>
       <input name='description' type="text"  placeholder='Enter description'/>
       <button>Create note</button>
    </form>

    

    <div className="notes">

      {notes.map((note)=>{
        return <div className="note">
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <button onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
      <button onClick={()=>{
        openEditModal(note)
      }}>Edit</button>
       
      
    
       
      </div>
      })}
      
    </div>
    </>
  )
}

export default App
