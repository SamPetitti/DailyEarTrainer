import { TestBed } from '@angular/core/testing';
import { Note } from '../note';

import { EvaluateNotesService } from './evaluate-notes.service';

describe('EvaluateNotesService', () => {
  let service: EvaluateNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluateNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});


const correctNotes : Note[] = [
   {noteName: 'c',
    octave: 4,
    keyColor: 'white',
    accidental: null,
    noteStatus: 'incorrect',
    altNote: 'c',
    altAccidental: null,
  },
  {
    noteName: 'c#',
    octave: 4,
    keyColor: 'black',
    accidental: '#',
    noteStatus: 'incorrect',
    altNote: 'd',
    altAccidental: 'b',
  },
  {
    noteName: 'd',
    octave: 4,
    keyColor: 'white',
    accidental: null,
    noteStatus: 'incorrect',
    altNote: 'd',
    altAccidental: null,
  },
  {
    noteName: 'd#',
    octave: 4,
    keyColor: 'black',
    accidental: '#',
    noteStatus: 'incorrect',
    altNote: 'e',
    altAccidental: 'b',
  },
  {
    noteName: 'e',
    octave: 4,
    keyColor: 'white',
    accidental: null,
    noteStatus: 'incorrect',
    altNote: 'e',
    altAccidental: null,
  }]
