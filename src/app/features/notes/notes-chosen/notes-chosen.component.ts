import { Component, OnInit } from '@angular/core';
import { Note, NotesList } from '../note';
import { SubmitNotesService } from '../../../services/submit-notes.service';
import { AudioService } from 'src/app/services/audio.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { submittedNoteChoices } from '../state/reducers/notes.reducer';

@Component({
  selector: 'app-notes-chosen',
  templateUrl: './notes-chosen.component.html',
  styleUrls: ['./notes-chosen.component.css'],
})
export class NotesChosenComponent implements OnInit {
  constructor(private store: Store) {}

  submittedNoteChoices$!: Observable<Note[][]>;
  ngOnInit(): void {
    this.submittedNoteChoices$ = this.store.select(submittedNoteChoices);
  }




}
