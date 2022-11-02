import request from "apis/request";
import { CreateNoteRequest, CreateNoteResponse, DeleteNoteRequest, DeleteNoteResponse, getMyNotesResponse, UpdateNoteRequest, UpdateNoteResponse } from "./contract";


export const createNote = async (payload: CreateNoteRequest) => {
  return await request.post<CreateNoteRequest, CreateNoteResponse>("/note", payload);
}

export const updateNote = async (payload: UpdateNoteRequest) => {
  return await request.put<UpdateNoteRequest, UpdateNoteResponse>("/note", payload);
}


export const deleteNote = async (payload: DeleteNoteRequest) => {
  return await request.delete<DeleteNoteRequest, DeleteNoteResponse>("/note", payload);
}


export const getMyNotes = async () => {
  return await request.get<getMyNotesResponse>("/note");
}