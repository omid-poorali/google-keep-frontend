import request from "apis/request";
import { CreateNoteRequest, CreateNoteResponse } from "./contract";


export const createNote = async (payload: CreateNoteRequest) => {
  return await request.post<CreateNoteRequest, CreateNoteResponse>("/note", payload);
}