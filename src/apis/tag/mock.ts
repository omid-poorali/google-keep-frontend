import {
  CreateTagRequest,
  CreateTagResponse,
  DeleteTagRequest,
  DeleteTagResponse,
  getMyTagsRequest,
  getMyTagsResponse,
  UpdateTagRequest,
  UpdateTagResponse
} from "./contract";

export const createTag = async (_payload: CreateTagRequest) => {
  return new Promise<CreateTagResponse>((resolve) => {
    resolve({
      id: 'id',
      name: 'name',
    });
  });
}

export const updateTag = async (_payload: UpdateTagRequest) => {
  return new Promise<UpdateTagResponse>((resolve) => {
    resolve({
      id: 'id',
      name: 'name',
    });
  });
}

export const deleteTag = async (_payload: DeleteTagRequest) => {
  return new Promise<DeleteTagResponse>((resolve) => {
    resolve();
  });
}

export const getMyTags = async (_payload: getMyTagsRequest) => {
  return new Promise<getMyTagsResponse>((resolve) => {
    resolve([{
      id: 'id',
      name: 'name',
    }]);
  });
}