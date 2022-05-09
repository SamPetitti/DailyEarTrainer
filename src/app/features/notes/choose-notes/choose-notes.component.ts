import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';
import { SubmitNotesService } from 'src/app/services/submit-notes.service';
import { Note, NotesList } from '../note';
import { keyboardNotes } from '../notes-data';
import * as actions from '../state/actions/notes.actions';
import { chosenNotesData, errorMessage } from '../state/reducers/notes.reducer';

@Component({
  selector: 'app-choose-notes',
  templateUrl: './choose-notes.component.html',
  styleUrls: ['./choose-notes.component.css'],
})
export class ChooseNotesComponent implements OnInit {
  chosenNotes$!: Observable<Note[]>;
  allNotes!: Note[];
  errorMessage$!: Observable<string>;

  constructor(
    private submitNotesService: SubmitNotesService,
    private audioService: AudioService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.chosenNotes$ = this.store.select(chosenNotesData);
    this.allNotes = keyboardNotes;
    this.errorMessage$ = this.store.select(errorMessage);
  }

  add(noteToAdd: Note) {
    this.store.dispatch(actions.addNoteChosen({ payload: { noteToAdd } }));
  }
}
