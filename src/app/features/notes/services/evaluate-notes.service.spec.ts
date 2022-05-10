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

const correctNotes: Note[] = [
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
];
