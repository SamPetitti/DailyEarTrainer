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
        noteStatus: 'black',
        altNote: 'c',
        altAccidental: null,
      },
      {
        id: 2,
        noteName: 'c#',
        octave: 4,
        keyColor: 'black',
        accidental: '#',
        noteStatus: 'black',
        altNote: 'd',
        altAccidental: 'b',
      },
      {
        id: 3,
        noteName: 'd',
        octave: 4,
        keyColor: 'white',
        accidental: null,
        noteStatus: 'black',
        altNote: 'd',
        altAccidental: null,
      },
      {
        id: 4,
        noteName: 'd#',
        octave: 4,
        keyColor: 'black',
        accidental: '#',
        noteStatus: 'black',
        altNote: 'e',
        altAccidental: 'b',
      },
      {
        id: 5,
        noteName: 'e',
        octave: 4,
        keyColor: 'white',
        accidental: null,
        noteStatus: 'black',
        altNote: 'e',
        altAccidental: null,
      },
    ];
  });

  it('should evaluate correctNotes', () => {
    const correctNotes: number[] = [5,4,3,2,1];

    const evaluatedNotes = evaluateGuesses(noteGuesses, correctNotes);

    expect(evaluatedNotes[0].noteStatus).toBe('yellow');
    expect(evaluatedNotes[1].noteStatus).toBe('yellow');
    expect(evaluatedNotes[2].noteStatus).toBe('green');
    expect(evaluatedNotes[3].noteStatus).toBe('yellow');
    expect(evaluatedNotes[4].noteStatus).toBe('yellow');
  });

  it('should evaluate in notes list notes', () => {
    const correctNotes: number[] = [13,12,11,10,1];

    const evaluatedNotes = evaluateGuesses(noteGuesses, correctNotes);

    expect(evaluatedNotes[0].noteStatus).toBe('yellow');
    expect(evaluatedNotes[1].noteStatus).toBe('black');
    expect(evaluatedNotes[2].noteStatus).toBe('black');
    expect(evaluatedNotes[3].noteStatus).toBe('black');
    expect(evaluatedNotes[4].noteStatus).toBe('black');
  });
});
