import React, { useEffect, useState } from "react";
import { useNotes } from "contexts";
import classNames from "classnames";
import { CreateNoteBar } from "./createNoteBar";
import { NoteItem } from "./item";
import * as Models from "models";
import { useSearchParams } from "react-router-dom";


type PropsType = {
  className: string;
}

export const Notes = (props: PropsType) => {

  const {
    className
  } = props;

  const [params] = useSearchParams();
  const { notes, deleteNote, updateNote } = useNotes();
  const [filteredNotes, setFilteredNotes] = useState(notes);

  useEffect(() => {
    const tagId = params.get("tag");
    if (tagId) {
      const filtered = notes.filter(note => note.tags.includes(tagId))
      setFilteredNotes(() => filtered);
    }
    else {
      setFilteredNotes(() => notes);
    }

  }, [notes, params]);

  const handleUpdateNote = (note: Models.Note) => {
    updateNote(note);
  }

  const handleDeleteNote = (note: Models.Note) => {
    deleteNote(note.id);
  }




  const rootClassName = classNames("p-8 w-full flex flex-col items-center", className);

  return (
    <div className={rootClassName}>
      <CreateNoteBar />
      <ul className="w-full mt-8 columns-[14rem]">
        {React.Children.toArray(filteredNotes.reverse().map(note => (
          <NoteItem
            className="break-inside-avoid"
            note={note}
            onUpdate={handleUpdateNote}
            onDelete={handleDeleteNote} />
        )))}
      </ul>
    </div>
  )
}