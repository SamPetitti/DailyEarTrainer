import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private submitNotesService: SubmitNotesService) { }

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
    this.chosenNotes = [];
  }

  playMelody(): void {
    var audio = new Audio('../../assets/DailyEarTrainerSamples.mp3');
    audio.load();
    audio.play();
  }


}
