import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
export const featureName = 'featureNotes';

import { Note } from '../../note';
import { createReducer, on } from '@ngrx/store';
import * as NotesActions from '../actions/notes.actions';
import { Barline, BarlineType, Factory } from 'vexflow';
import { Stave, StaveNote, Beam, Formatter, Renderer } from 'vexflow';

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
      console.log(a.payload.keyboardNote.noteName);
      const noteEntered: Note = {
        noteName: a.payload.keyboardNote.noteName,
        isCorrect: false,
      };
      const updatedNotesChosen = [...s.chosenNotes, noteEntered];
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
  on(NotesActions.removeNoteChosen, (s): NotesState => {
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
  on(
    NotesActions.SubmitNotes,
    (s, a): NotesState => {
      if (s.chosenNotes.length < 5) {
        return { ...s, error: 'must have all notes to submit guess' };
      }
      if (s.submittedGuesses.length === 6) {
        return { ...s, error: 'already submitted all your guesses dude!' };
      } else {
        const div = document.getElementById('output');
        const renderer = new Renderer('output', Renderer.Backends.SVG);

        // Configure the rendering context.
        renderer.resize(720, 130);
        const context = renderer.getContext();

        // Measure 1
        const staveMeasure1 = new Stave(10, 0, 300);
        staveMeasure1.addClef('treble').setContext(context).draw();

        const notesMeasure1: StaveNote[] = a.payload.notes
          .slice(0, 5)
          .map(
            (n) => new StaveNote({ keys: [n.noteName + '/4'], duration: 'q' })
          );
        //   new StaveNote({ keys: ['c/4'], duration: 'q' }),
        //   new StaveNote({ keys: ['d/4'], duration: 'q' }),
        //   new StaveNote({ keys: ['b/4'], duration: 'qr' }),
        //   new StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: 'q' }),
        // ];

        // Helper function to justify and draw a 4/4 voice
        Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);

        // Measure 2 - second measure is placed adjacent to first measure.
        // const staveMeasure2 = new Stave(
        //   staveMeasure1.getWidth() + staveMeasure1.getX(),
        //   0,
        //   400
        // );

        // const notesMeasure2_part1: StaveNote[] = a.payload.notes
        //   .slice(4, 5)
        //   .map(
        //     (n) => new StaveNote({ keys: [n.noteName + '/4'], duration: 'q' })
        //   );

        // Create the beams for 8th notes in second measure.
        //const beam1 = new Beam(notesMeasure2_part1);

        //  const notesMeasure2 = notesMeasure2_part1; //.concat(notesMeasure2_part2);

        // staveMeasure2.setContext(context).draw();
        //Formatter.FormatAndDraw(context, staveMeasure2, notesMeasure2);

        // Render beams
        // beam1.setContext(context).draw();
        return {
          ...s,
          error: '',
          submittedGuesses: [...s.submittedGuesses, [...a.payload.notes]],
          chosenNotes: [],
        };

        //   const vf = new Factory({
        //     renderer: { elementId: 'output', width: 500, height: 200 },
        //   });

        //   const score = vf.EasyScore();
        //   const system = vf.System();
        //   //var notes = this.submittedNoteChoices$.pipe;
        //   const notesGroups: string[][] = [
        //     ['C#5/q, B4, A4, G#4'],
        //     ['C5/q,C5,C5,C5'],
        //   ];
        //   notesGroups.forEach((notes) => {
        //     system
        //       .addStave({
        //         voices: [
        //           score.voice(score.notes(notes.toString(), { stem: 'down' })),
        //         ],
        //       },
        //     )
        //       .addClef('treble')
        //       .addTimeSignature('4/4');
        //   });
        //   system.addStave({
        //         voices: [
        //           score.voice(score.notes(['C5/q,C5,C5,C5'].toString(), { stem: 'down' })),
        //         ]});
        //   vf.draw();
        //   return {
        //     ...s,
        //     error: '',
        //     submittedGuesses: [...s.submittedGuesses, [...a.payload.notes]],
        //     chosenNotes: [],
        //   };
        // }
      }
      // on(actions.countIncremented, (s) => ({ current: s.current + 1 })),
      // on(actions.reset, (s) => ({ current: 0 }))
    }
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
  )
);
