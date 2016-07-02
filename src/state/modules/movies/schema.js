import { Schema, arrayOf } from 'normalizr';

export const MOVIE = new Schema('movies');
export const MOVIES_ARRAY = arrayOf(MOVIE);
