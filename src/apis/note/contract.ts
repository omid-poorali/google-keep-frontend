import * as Models from "models";

export type CreateNoteRequest = Omit<Models.Note, 'id'>;
export type CreateNoteResponse = Models.Note;

export type getMyNotesRequest = void;
export type getMyNotesResponse = Models.Note[];