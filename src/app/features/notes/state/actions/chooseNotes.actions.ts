import { createAction, props } from '@ngrx/store';
import { Note } from '../../note';

export const noteChosen = createAction(
  '[chooseNotes] note',
  props<{ payload: { note: Note } }>()
);
