export interface Note {
  noteName: string;
  isCorrect: boolean;
}

export interface NotesList {
  notes: Note[];
  total: number;
}
