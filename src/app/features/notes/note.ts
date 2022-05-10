// export interface Note {
//   noteName: string;
//   noteStatus: NoteStatus;
//   accidental: Accidental;
// }

export interface NotesList {
  notes: Note[];
  total: number;
}

export interface Note {
  id: number;
  noteName: string;
  keyColor: KeyColor;
  octave: number;
  accidental: Accidental;
  noteStatus: NoteStatus;
  altNote: string;
  altAccidental: Accidental;
}

export type KeyColor = 'white' | 'black';

export type Accidental = '#' | 'b' | null;

export type NoteStatus = 'black' | '#c9c91d' | 'g#009933';
