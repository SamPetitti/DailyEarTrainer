import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from '../features/notes/note';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  getAudioNotes(): Note[] {
    const notes: Note[] = [
      { noteName: 'C', noteStatus: 'incorrect', accidental: null },
      { noteName: 'D', noteStatus: 'incorrect', accidental: null },
      { noteName: 'E', noteStatus: 'incorrect', accidental: null },
      { noteName: 'F', noteStatus: 'incorrect', accidental: null },
      { noteName: 'G', noteStatus: 'incorrect', accidental: null },
    ];

    return notes;
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
