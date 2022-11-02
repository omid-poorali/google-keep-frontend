import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as Models from 'models';
import * as Apis from "apis";

interface NotesContextData {
  notes: Models.Note[];
  addNote: (input: Omit<Models.Note, 'id'>) => Promise<Models.Note>;
  updateNote: (input: Models.Note) => Promise<Models.Note>;
  deleteNote: (id: string) => Promise<Models.Note>;
}

const NotesContext = createContext<NotesContextData>({} as NotesContextData);

export const NotesProvider = ({ children }: { children: ReactNode }) => {

  const [allNotes, setAllNotes] = useState<Models.Note[]>([]);

  useEffect(() => {
    Apis.note.getMyNotes().then(notes => {
      setAllNotes(() => notes);
    })
  }, []);

  const updateNote = (input: Models.Note) => {
    return new Promise<Models.Note>(async (resolve, reject) => {
      Apis.note.updateNote(input).then((updatedNote) => {
        const updatedNotes = [...allNotes];
        const noteIndex = updatedNotes.findIndex(
          noteItem => noteItem.id === updatedNote.id,
        );
        updatedNotes[noteIndex] = updatedNote;
        setAllNotes(updatedNotes);
        resolve(updatedNote);
      }).catch(() => {
        reject();
      });
    });
  };

  const addNote = (input: Omit<Models.Note, 'id'>) => {
    return new Promise<Models.Note>(async (resolve, reject) => {
      Apis.note.createNote(input).then((newNote) => {
        setAllNotes(state => [...state, newNote]);
        resolve(newNote);
      }).catch(() => {
        reject();
      });
    });
  };


  const deleteNote = (id: string) => {
    return new Promise<Models.Note>((resolve, reject) => {
      Apis.note.deleteNote({ id }).then(() => {
        setAllNotes(state => state.filter(note => note.id !== id));
      }).catch(() => {
        reject();
      })
    });
  };


  return (
    <NotesContext.Provider
      value={{
        notes: allNotes,
        addNote,
        updateNote,
        deleteNote,
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