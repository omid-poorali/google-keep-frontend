import request from "apis/request";
import { CreateNoteRequest, CreateNoteResponse, getMyNotesRequest, getMyNotesResponse } from "./contract";


export const createNote = async (payload: CreateNoteRequest) => {
  return await request.post<CreateNoteRequest, CreateNoteResponse>("/note", payload);
}

export const getMyNotes = async (payload: getMyNotesRequest) => {
  return await request.get<getMyNotesRequest, getMyNotesResponse>("/note", payload);
}