import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
export const featureName = 'featureNotes';

import { Note } from '../../note';
import { createReducer, on } from '@ngrx/store';
import * as NotesActions from '../actions/notes.actions';

export interface NotesState {
  chosenNotes: Note[];
  submittedGuesses: Note[][];
  total: number;
  error: string;
}

const initialState: NotesState = {
  chosenNotes: [],
  submittedGuesses: [],
  total: 0,
  error: '',
};

const getNotesFeatureState = createFeatureSelector<NotesState>(featureName);

export const chosenNotesData = createSelector(
  getNotesFeatureState,
  (n) => n.chosenNotes
);

export const submittedNoteChoices = createSelector(
  getNotesFeatureState,
  (n) => n.submittedGuesses
);

export const errorMessage = createSelector(
  getNotesFeatureState,
  (e) => e.error
);

export const notesReducer = createReducer<NotesState>(
  initialState,
  on(NotesActions.addNoteChosen, (s, a): NotesState => {
    if (s.chosenNotes.length < 5) {
      const updatedNotesChosen = [...s.chosenNotes, a.payload.note];
      return {
        ...s,
        error: '',
        chosenNotes: updatedNotesChosen,
      };
    } else {
      return {
        ...s,
        error: 'Max 5 notes chosen',
      };
    }
  }),
  on(NotesActions.removeNoteChosen, (s, a): NotesState => {
    if (s.chosenNotes.length > 0) {
      const remainingNotes = [...s.chosenNotes].splice(
        0,
        s.chosenNotes.length - 1
      );
      console.log(remainingNotes);
      return {
        ...s,
        error: '',
        chosenNotes: remainingNotes,
      };
    } else {
      return {
        ...s,
      };
    }
  }),
  on(NotesActions.SubmitNotes, (s, a): NotesState => {
    if (s.chosenNotes.length < 5) {
      return { ...s, error: 'must have all notes to submit guess' };
    }
    if (s.submittedGuesses.length === 6) {
      return { ...s, error: 'already submitted all your guesses dude!' };
    } else {
      return {
        ...s,
        error: '',
        submittedGuesses: [...s.submittedGuesses, [...s.chosenNotes]],
        chosenNotes: [],
      };
    }
  })
  // on(actions.countIncremented, (s) => ({ current: s.current + 1 })),
  // on(actions.reset, (s) => ({ current: 0 }))
);
//**selector stuff */
// export const featureName = 'featureTrafficLights';

// import {
//   ActionReducerMap,
//   createFeatureSelector,
//   createSelector,
// } from '@ngrx/store';
// import { CounterModel } from '../models';
// import * as fromCounter from './reducers/counter.reducer';
// import * as fromLights from './reducers/light.reducer';

// export interface TrafficFeatureState {
//   lights: fromLights.LightState;
//   counter: fromCounter.CounterState;
// }
// export const reducers: ActionReducerMap<TrafficFeatureState> = {
//   lights: fromLights.reducer,
//   counter: fromCounter.reducer,
// };

// // 1. Create a Feature Selector (functions that are queries)

// const selectFeature = createFeatureSelector<TrafficFeatureState>(featureName);
// // 2. Create a selector for each "branch" of the state.

// const selectLightsBranch = createSelector(selectFeature, (f) => f.lights);
// const selectCounterBranch = createSelector(selectFeature, (f) => f.counter);
// // 3. Any "Helpers" (optional)

// // 4. What the components need (light component needs the color.)

// export const selectLightColor = createSelector(
//   selectLightsBranch,
//   (b) => b.color
// );

//***reducer stuff */
// import { createReducer, on } from '@ngrx/store';
// import * as actions from '../actions/counter.actions';

// export interface CounterState {
//   current: number;
// }

// const initialState: CounterState = {
//   current: 0,
// };

// export const reducer = createReducer(
//   initialState,
//   on(actions.counterCount, (_, a) => ({ current: a.payload })),
//   on(actions.countDecremented, (s) => ({ current: s.current - 1 })),
//   on(actions.countIncremented, (s) => ({ current: s.current + 1 })),
//   on(actions.reset, (s) => ({ current: 0 }))
// );
