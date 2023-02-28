import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "63f9f2be50a491e28c49111c",
      user: "63f9ccc7e495639fd15cdf61",
      title: "My Title--update",
      description: "Please wake up early--update",
      tag: "Personal--update",
      date: "2023-02-25T11:36:30.895Z",
      __v: 0,
    },
    {
      _id: "63fa51933dc45f3c1c833700",
      user: "63f9ccc7e495639fd15cdf61",
      title: "My Title",
      description: "Please wake up early",
      tag: "Personal",
      date: "2023-02-25T18:21:07.423Z",
      __v: 0,
    },
    
  ];

  const[notes, setNotes] = useState(notesInitial)

  //Add a note
  const addNote = (title, description, tag) =>{
    //TODO: api call
    console.log("Adding a new note")
    const note = {
      _id: "63fa51933dc45f3c1c833700",
      user: "63f9ccc7e495639fd15cdf61",
      title: title,
      description: description,
      tag: tag,
      date: "2023-02-25T18:21:07.423Z",
      __v: 0,
    };
    setNotes(notes.concat(note))
  }

  //Delete a note
  const deleteNote = (id) =>{
    //TODO: api call
    console.log("Delete" + id);
    const newNote = notes.filter((note) =>{return note._id!==id})
    setNotes(newNote)

  }

  //Edit a note
  const editNote = () =>{
    const editNote = (id, title, description, tag) =>{
      
    }

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
