import * as Models from "models";

export type CreateNoteRequest = Omit<Models.Note, 'id'>;
export type CreateNoteResponse = Models.Note;

export type UpdateNoteRequest = Models.Note;
export type UpdateNoteResponse = Models.Note;

export type DeleteNoteRequest = Pick<Models.Note, 'id'>;
export type DeleteNoteResponse = void;

export type getMyNotesRequest = void;
export type getMyNotesResponse = Models.Note[];