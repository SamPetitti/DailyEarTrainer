import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';
import { SubmitNotesService } from 'src/app/services/submit-notes.service';
import { Note } from '../note';
import { notesData } from '../notes-data';

@Component({
  selector: 'app-choose-notes',
  templateUrl: './choose-notes.component.html',
  styleUrls: ['./choose-notes.component.css']
})
export class ChooseNotesComponent implements OnInit {

  notes: Note[] = notesData;
  chosenNotes: Note[] = [];
  errorMessage: string = "";
  correctNotesChosen: boolean = false;
  constructor(private submitNotesService: SubmitNotesService, private audioService: AudioService) { }

  ngOnInit(): void {

  }

  add(note: Note): void {
    if (this.chosenNotes.length < 5) {
      this.chosenNotes.push(note);
    } else {
      this.errorMessage = "No more notes can be chosen"
    }
  }

  removeNote(): void {
    this.chosenNotes.pop();
  }

  submitNotes(): void {
    if (this.chosenNotes.length != 5) { return; }
    this.submitNotesService.addChosenNoteGroup(this.chosenNotes);
    this.correctNotesChosen = this.audioService.verifyNotesChosenAgainstAudioNotes(this.chosenNotes);
    if (this.correctNotesChosen) {
      alert("you chose correct notes!")
    }
    this.chosenNotes = [];
  }

  playMelody(): void {
    this.audioService.playAudio();
  }


}
