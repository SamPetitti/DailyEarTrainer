import { Note } from '../../note';
import { evaluateGuesses } from './notes.reducer';

describe('Notes Reducer', () => {
  let noteGuesses: Note[]; //1 2 3 4 5

  beforeEach(() => {
    noteGuesses = [
      {
        id: 1,
        noteName: 'c',
        octave: 4,
        keyColor: 'white',
        accidental: null,
        noteStatus: 'incorrect',
        altNote: 'c',
        altAccidental: null,
      },
      {
        id: 2,
        noteName: 'c#',
        octave: 4,
        keyColor: 'black',
        accidental: '#',
        noteStatus: 'incorrect',
        altNote: 'd',
        altAccidental: 'b',
      },
      {
        id: 3,
        noteName: 'd',
        octave: 4,
        keyColor: 'white',
        accidental: null,
        noteStatus: 'incorrect',
        altNote: 'd',
        altAccidental: null,
      },
      {
        id: 4,
        noteName: 'd#',
        octave: 4,
        keyColor: 'black',
        accidental: '#',
        noteStatus: 'incorrect',
        altNote: 'e',
        altAccidental: 'b',
      },
      {
        id: 5,
        noteName: 'e',
        octave: 4,
        keyColor: 'black',
        accidental: null,
        noteStatus: 'incorrect',
        altNote: 'e',
        altAccidental: null,
      },
    ];
  });

  it('should evaluate correctNotes', () => {
    const correctNotes: number[] = [5, 4, 3, 2, 1];

    const evaluatedNotes = evaluateGuesses(noteGuesses, correctNotes);

    expect(evaluatedNotes[0].noteStatus).toBe('inNoteList');
    expect(evaluatedNotes[1].noteStatus).toBe('inNoteList');
    expect(evaluatedNotes[2].noteStatus).toBe('correct');
    expect(evaluatedNotes[3].noteStatus).toBe('inNoteList');
    expect(evaluatedNotes[4].noteStatus).toBe('inNoteList');
  });

  it('should evaluate in notes list notes', () => {
    const correctNotes: number[] = [13, 12, 11, 10, 1];

    const evaluatedNotes = evaluateGuesses(noteGuesses, correctNotes);

    expect(evaluatedNotes[0].noteStatus).toBe('inNoteList');
    expect(evaluatedNotes[1].noteStatus).toBe('incorrect');
    expect(evaluatedNotes[2].noteStatus).toBe('incorrect');
    expect(evaluatedNotes[3].noteStatus).toBe('incorrect');
    expect(evaluatedNotes[4].noteStatus).toBe('incorrect');
  });
});
