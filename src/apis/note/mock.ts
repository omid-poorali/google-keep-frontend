import { CreateNoteRequest, CreateNoteResponse, DeleteNoteRequest, DeleteNoteResponse, getMyNotesRequest, getMyNotesResponse, UpdateNoteRequest, UpdateNoteResponse } from "./contract";

export const createNote = async (_payload: CreateNoteRequest) => {
  return new Promise<CreateNoteResponse>((resolve) => {
    resolve({
      id: 'id',
      title: 'title',
      body: 'body'
    });
  });
}

export const updateNote = async (_payload: UpdateNoteRequest) => {
  return new Promise<UpdateNoteResponse>((resolve) => {
    resolve({
      id: 'id',
      title: 'title',
      body: 'body'
    });
  });
}


export const deleteNote = async (_payload: DeleteNoteRequest) => {
  return new Promise<DeleteNoteResponse>((resolve) => {
    resolve();
  });
}



export const getMyNotes = async (_payload: getMyNotesRequest) => {
  return new Promise<getMyNotesResponse>((resolve) => {
    resolve([{
      id: 'id',
      title: 'title',
      body: 'body'
    }]);
  });
}