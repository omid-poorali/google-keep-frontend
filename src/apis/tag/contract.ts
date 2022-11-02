import * as Models from "models";

export type CreateTagRequest = Omit<Models.Tag, 'id'>;
export type CreateTagResponse = Models.Tag;

export type UpdateTagRequest = Models.Tag;
export type UpdateTagResponse = Models.Tag;

export type DeleteTagRequest = Pick<Models.Tag, 'id'>;
export type DeleteTagResponse = void;

export type getMyTagsRequest = void;
export type getMyTagsResponse = Models.Tag[];