export interface Note {
    noteName: string,
    isCorrect: boolean
}

export interface Notes extends Array<Note> { }