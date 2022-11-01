import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as Models from 'models';
import * as Apis from "apis";

interface NotesContextData {
  notes: Models.Note[];
  setNotes(data: { notes: Models.Note[]; notesCount?: number }): void;
  addNotes(data: { notes: Models.Note[]; notesCount?: number }): void;
  addNote(note: Models.Note): void;
  updateNote(note: Models.Note): void;
  removeNote(id: string): void;
}

const NotesContext = createContext<NotesContextData>({} as NotesContextData);

export const NotesProvider = ({ children }: { children: ReactNode }) => {

  const [allNotes, setAllNotes] = useState<Models.Note[]>([]);

  useEffect(() => {
    Apis.note.getMyNotes().then(notes => {
      setAllNotes(() => notes);
    })
  }, []);

  const updateNote = (note: Models.Note) => {
    const updatedNotes = [...allNotes];
    const noteIndex = updatedNotes.findIndex(
      noteItem => noteItem.id === note.id,
    );
    updatedNotes[noteIndex] = note;
    setAllNotes(updatedNotes);
  };

  const setNotes = ({ notes }: { notes: Models.Note[] }) => {
    setAllNotes(notes);
  };

  const addNotes = ({ notes }: { notes: Models.Note[] }) => {
    setAllNotes([...allNotes, ...notes]);
  };

  const addNote = (note: Models.Note) => {
    setAllNotes(state => [...state, note]);
  };

  const removeNote = (id: string) => {
    setAllNotes(state => state.filter(note => note.id !== id));
  };

  return (
    <NotesContext.Provider
      value={{
        notes: allNotes,
        setNotes,
        addNotes,
        addNote,
        updateNote,
        removeNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextData => {
  const context = useContext(NotesContext);

  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }

  return context;
}