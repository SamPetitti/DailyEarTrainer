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
       removeGuesses('guesses');
       drawNotes('guesses', updatedNotesChosen);
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

      removeGuesses('guesses');
      drawNotes('guesses', remainingNotes);
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

      removeGuesses('guesses');
      drawNotes('output', s.chosenNotes);

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
    }
  })
);

//**EASY SCORE example */
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

//helpers
const removeGuesses = (elementName: string): void => {
  const element = document.getElementById(elementName);
  while (element!.hasChildNodes()) {
    const childNodes = element?.childNodes;
    element!.removeChild(childNodes![childNodes!.length - 1]);
  }
};

const drawNotes = (element: string, notes: Note[]) : void => {
  if(notes.length > 0){
   const renderer = new Renderer(element, Renderer.Backends.SVG);

   // Configure the rendering context.
   renderer.resize(720, 130);

   // Configure the rendering context.
   renderer.resize(720, 130);
   const context = renderer.getContext();
   //context.clear();
   // Measure 1
   const staveMeasure1 = new Stave(10, 0, 300);
   staveMeasure1.addClef('treble').setContext(context).draw();

   const notesMeasure1: StaveNote[] = notes
     .slice(0, 5)
     .map((n) => new StaveNote({ keys: [`${n.noteName}/4`], duration: 'q' }));

   // Helper function to justify and draw a 4/4 voice
   Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);
  }
}
