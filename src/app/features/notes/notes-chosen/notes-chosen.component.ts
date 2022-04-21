import { Component, OnInit } from '@angular/core';
import { Note, NotesList } from '../note';
import { SubmitNotesService } from '../../../services/submit-notes.service';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-notes-chosen',
  templateUrl: './notes-chosen.component.html',
  styleUrls: ['./notes-chosen.component.css'],
})
export class NotesChosenComponent implements OnInit {
  constructor(private submitNotesService: SubmitNotesService) {}

  ngOnInit(): void {
    this.getChosenNotes();
  }

  chosenNotes! : NotesList;
  correctNotesChosen: boolean = false;

  getChosenNotes(): void {
    // this.submitNotesService.getChosenNoteGroups().subscribe(chosenNotes => this.chosenNotes = chosenNotes);
  }
}
