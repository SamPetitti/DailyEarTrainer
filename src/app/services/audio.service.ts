import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from '../notes/note';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  getAudioNotes(): Note[] {
    const notes: Note[] = [
      { noteName: "C" },
      { noteName: "D" },
      { noteName: "E" },
      { noteName: "F" },
      { noteName: "G" }]

    return notes;
  }


  playAudio(): void {
    var audio = new Audio('../../assets/DailyEarTrainerSamples.mp3');
    audio.load();
    audio.play();
  }

  verifyNotesChosenAgainstAudioNotes(notes: Note[]): boolean {
    let notesAreSame: boolean = true;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].noteName.toLowerCase() !== this.getAudioNotes()[i].noteName.toLowerCase()) {
        notesAreSame = false;
        break;

      }
    }
    return notesAreSame;
  }

  constructor() { }
}
