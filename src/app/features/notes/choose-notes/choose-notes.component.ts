import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';
import { SubmitNotesService } from 'src/app/services/submit-notes.service';
import { KeyboardNote, Note, NotesList } from '../note';
import { keyboardNotes } from '../notes-data';
import * as actions from '../state/actions/notes.actions';
import { chosenNotesData, errorMessage } from '../state/reducers/notes.reducer';
//import * from '../state/reducers'
//import *

@Component({
  selector: 'app-choose-notes',
  templateUrl: './choose-notes.component.html',
  styleUrls: ['./choose-notes.component.css'],
})
export class ChooseNotesComponent implements OnInit {
  chosenNotes$!: Observable<Note[]>;
  allNotes!: KeyboardNote[];
  errorMessage$!: Observable<string>;
  // errorMessage: string = '';
  //correctNotesChosen: boolean = false;
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

  add(keyboardNote: KeyboardNote) {
    console.log(keyboardNote.noteName);
    this.store.dispatch(actions.addNoteChosen({ payload: { keyboardNote } }));
  }

  removeNote(): void {
    this.store.dispatch(actions.removeNoteChosen());
  }

  //todo: create effect
  submitNotes(notesSubmitted: Note[]): void {
    this.store.dispatch(
      actions.SubmitNotes({ payload: { notes: notesSubmitted } })
    );
  }

  playMelody(): void {
    this.audioService.playAudio();
  }
}
