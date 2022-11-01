import { CreateNoteRequest, CreateNoteResponse, getMyNotesRequest, getMyNotesResponse } from "./contract";

export const createNote = async (_payload: CreateNoteRequest) => {
  return new Promise<CreateNoteResponse>((resolve) => {
    resolve({
      id: 'id',
      title: 'title',
      body: 'body'
    });
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