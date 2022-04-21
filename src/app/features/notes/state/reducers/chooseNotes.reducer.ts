import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
export const featureName = 'featureNotes';

import { Note, NotesList } from '../../note';
import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/chooseNotes.actions';

export interface NotesFeatureState {
  chosenNotes: NotesList;
}

const initialState: NotesFeatureState = {
  chosenNotes: {
    notes: [],
    total: 0,
  },
};

const selectFeature = createFeatureSelector<NotesFeatureState>(featureName);
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
