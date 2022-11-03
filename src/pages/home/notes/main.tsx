import React from "react";
import { useNotes } from "contexts";
import classNames from "classnames";
import { CreateNoteBar } from "./createNoteBar";
import { NoteItem } from "./item";
import * as Models from "models";


type PropsType = {
  className: string;
}

export const Notes = (props: PropsType) => {

  const {
    className
  } = props;

  const { notes, deleteNote } = useNotes();

  const handleDeleteNote = (note: Models.Note) => {
    deleteNote(note.id);
  }

  const rootClassName = classNames("p-8 w-full flex flex-col items-center", className);

  return (
    <div className={rootClassName}>
      <CreateNoteBar />
      <ul className="w-full mt-8 columns-[12rem]">
        {React.Children.toArray(notes.reverse().map(note => (
          <NoteItem className="break-inside-avoid" note={note} onDelete={handleDeleteNote} />
        )))}
      </ul>
    </div>
  )
}