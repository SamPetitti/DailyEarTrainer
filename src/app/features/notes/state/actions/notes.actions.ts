import { createAction, props } from '@ngrx/store';
import { KeyboardNote, Note } from '../../note';

export const addNoteChosen = createAction(
  '[chooseNotes] add note',
  props<{ payload: { keyboardNote: KeyboardNote } }>()
);

export const removeNoteChosen = createAction('[chooseNotes] remove note');
export const SubmitNotes = createAction(
  '[chooseNotes], submitNotes',
  props<{ payload: { notes: Note[] } }>()
);
