import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from '../features/notes/note';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  getAudioNotes(): Note[] {
    return [
      {
        noteName: 'c',
        octave: 4,
        keyColor: 'white',
        accidental: null,
        noteStatus: 'incorrect',
        altNote: 'c',
        altAccidental: null,
      },
    ] as Note[];
  }

  playAudio(): void {
    const audio = new Audio('assets/DailyEarTrainerSamples.mp3');
    audio.load();
    audio.play();
  }

  verifyNotesChosenAgainstAudioNotes(notes: Note[]): boolean {
    let notesAreSame: boolean = true;
    for (let i = 0; i < notes.length; i++) {
      const chosenNotes = notes[i].noteName.toLowerCase();
      if (chosenNotes === this.getAudioNotes()[i].noteName.toLowerCase()) {
        //notesAreSame = false;
        //break;
      }
    }
    return notesAreSame;
  }

  constructor() {}
}
