import React from "react";
import { useNotes } from "contexts";
import { CreateNoteBar } from "./createNoteBar";
import { Options } from "./options";
import * as Models from "models";


export const Home = () => {

  const { notes, deleteNote } = useNotes();

  const handleDeleteNote = (note: Models.Note) => {
    deleteNote(note.id);
  }

  const renderNoteItem = (note: Models.Note) => (
    <li className={`mb-4 p-2 flex flex-col break-inside-avoid
             shadow-[0px_1px_1px_rgba(9,30,66,0.25),0px_0px_1px_1px_rgba(9,30,66,0.13)] 
             hover:shadow-[0px_1px_2px_0_rgba(60,64,67,0.302),0px_2px_6px_2px_rgba(60,64,67,0.149)]`}>
      <div className="text-base font-medium text-gray-500">{note.title}</div>
      <p className="flex-grow text-base font-normal text-gray-400">{note.body}</p>
      <Options note={note} onDelete={handleDeleteNote} />
    </li>
  )

  return (
    <div className="p-8 w-full flex flex-col items-center">
      <CreateNoteBar />
      <ul className="mt-8 columns-[12rem]">
        {React.Children.toArray(notes.reverse().map(note => renderNoteItem(note)))}
      </ul>
    </div>
  )
};