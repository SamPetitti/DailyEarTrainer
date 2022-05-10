import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
export const featureName = 'featureNotes';
import { Note, NoteStatus } from '../../note';
import { createReducer, on } from '@ngrx/store';
import * as NotesActions from '../actions/notes.actions';
import {
  Stave,
  StaveNote,
  Beam,
  Formatter,
  Renderer,
  Accidental,
} from 'vexflow';
import { Injectable } from '@angular/core';
import { EvaluateNotesService } from '../../services/evaluate-notes.service';
import { EMPTY } from 'rxjs';
import { keyboardNotes } from '../../notes-data';

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
    console.log(...s.chosenNotes);
    if (s.chosenNotes.length < 5) {
      console.log(a.payload.noteToAdd.noteName);

      const updatedNotesChosen = [...s.chosenNotes, a.payload.noteToAdd];
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
    if (a.payload.notes.length < 5) {
      return { ...s, error: 'must have all notes to submit guess' };
    }
    if (a.payload.notes.length === 6) {
      return { ...s, error: 'already submitted all your guesses dude!' };
    } else {
      removeGuesses('guesses');
      const evaluatedNotes = drawNotes('output', a.payload.notes);

      return {
        ...s,
        error: '',
        submittedGuesses: [...s.submittedGuesses, [...a.payload.notes]],
        chosenNotes: [],
      };
    }
  })
);

//helpers
const removeGuesses = (elementName: string): void => {
  const element = document.getElementById(elementName);
  while (element!.hasChildNodes()) {
    const childNodes = element?.childNodes;
    element!.removeChild(childNodes![childNodes!.length - 1]);
  }
};

const notesForTheDay: number[] = [1, 2, 3, 4, 5];
const drawNotes = (element: string, notes: Note[]): void => {
  if (notes.length > 0) {
    console.log(notes.map((n) => n.noteName));
    const renderer = new Renderer(element, Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(300, 100);
    const context = renderer.getContext();

    // Measure 1
    const staveMeasure1 = new Stave(10, 0, 300);
    staveMeasure1.addClef('treble').setContext(context).draw();


    const evaluatedNotes = evaluateGuesses(notes, notesForTheDay);
    console.log("evaluated notes " + evaluatedNotes);
    const notesMeasure1: StaveNote[] = evaluatedNotes.slice(0, 5).map((n) => {
      if (n.accidental === '#') {
        console.log(`note status: ${n.noteStatus}`);
        return new StaveNote({
          keys: [`${n.noteName}/${n.octave}`],
          duration: 'q',
        })
          .addModifier(new Accidental('#'))
          .setStyle({
            fillStyle: n.noteStatus,
          });
      }
      if (n.accidental === 'b') {
        return new StaveNote({
          keys: [`${n.noteName}/${n.octave}`],
          duration: 'q',
        })
          .addModifier(new Accidental('b'))
          .setStyle({
            fillStyle: n.noteStatus,
          });
      } else {
        return new StaveNote({
          keys: [`${n.noteName}/${n.octave}`],
          duration: 'q',
        }).setStyle({
          fillStyle: n.noteStatus,
        });
      }
    });

    // Helper function to justify and draw a 4/4 voice
    Formatter.FormatAndDraw(context, staveMeasure1, notesMeasure1);
  }
};

//make this a pipe //this should be put in effects
export const evaluateGuesses = (
  noteGuesses: Note[],
  correctNotes: number[]
): Note[] => {
  console.log(noteGuesses);
  let evaluatedGuesses: Note[] = [];
  for (let i = 0; i < noteGuesses.length; i++) {
    console.log(`note guesses id: ${noteGuesses[i].id}`);
    if (noteGuesses[i].id === correctNotes[i]) {
      const updatedGuess = { ...noteGuesses[i] };
      updatedGuess.noteStatus = 'green';
      evaluatedGuesses.push(updatedGuess);
    } else {
      if (correctNotes.includes(noteGuesses[i].id)) {
        const updatedGuess = { ...noteGuesses[i] };
        updatedGuess.noteStatus = 'yellow';
        evaluatedGuesses.push(updatedGuess);
      } else {
        const updatedGuess = { ...noteGuesses[i] };
        evaluatedGuesses.push(updatedGuess);
      }
    }
  }
  return evaluatedGuesses;
};
