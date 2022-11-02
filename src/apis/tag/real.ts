import request from "apis/request";
import {
  CreateTagRequest,
  CreateTagResponse,
  DeleteTagRequest,
  DeleteTagResponse,
  getMyTagsResponse,
  UpdateTagRequest,
  UpdateTagResponse
} from "./contract";


export const createTag = async (payload: CreateTagRequest) => {
  return await request.post<CreateTagRequest, CreateTagResponse>("/tag", payload);
}

export const updateTag = async (payload: UpdateTagRequest) => {
  return await request.put<UpdateTagRequest, UpdateTagResponse>("/tag", payload);
}


export const deleteTag = async (payload: DeleteTagRequest) => {
  return await request.delete<DeleteTagRequest, DeleteTagResponse>("/tag", payload);
}


export const getMyTags = async () => {
  return await request.get<getMyTagsResponse>("/tag");
}