export interface Note {
  noteName: string;
  isCorrect: boolean;
}

export interface Notes {
  note: Note[];
  total: number;
}
