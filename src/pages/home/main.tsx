import React from "react";
import { useNotes } from "contexts";
import { CreateNoteBar } from "./createNoteBar";

export const Home = () => {

  const { notes } = useNotes();

  return (
    <div className="p-8 w-full h-screen flex flex-col items-center">
      <CreateNoteBar />
      <div className="w-full flex flex-row flex-wrap">
        {React.Children.toArray(notes.reverse().map(note => (
          <div className="m-4 w-36 h-48 border border-gray-400">
            <div>{note.title}</div>
            <div>{note.body}</div>
          </div>
        )))}
      </div>
    </div>
  )
};