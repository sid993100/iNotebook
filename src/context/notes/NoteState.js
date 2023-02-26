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

  return (
    <NoteContext.Provider value={{ notes, setNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
