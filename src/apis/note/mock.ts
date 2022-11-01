import { RequestResult } from "apis/request";
import { CreateNoteRequest, CreateNoteResponse } from "./contract";


export const createNote = async (payload: CreateNoteRequest) => {
  return new Promise<RequestResult<CreateNoteResponse>>((resolve) => {
    resolve({
      message: "success",
      data: {}
    } as RequestResult<CreateNoteResponse>);
  });
}