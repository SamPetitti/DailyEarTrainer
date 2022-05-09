import { createAction, props } from '@ngrx/store';
import { Note } from '../../note';

export const addNoteChosen = createAction(
  '[chooseNotes] add note',
  props<{ payload: { noteToAdd: Note } }>()
);

export const removeNoteChosen = createAction('[chooseNotes] remove note');
export const SubmitNotes = createAction(
  '[chooseNotes], submitNotes',
  props<{ payload: { notes: Note[] } }>()
);
