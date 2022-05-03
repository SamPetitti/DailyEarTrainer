import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AudioService } from 'src/app/services/audio.service';
import { KeyboardNote, Note } from '../note';
import * as actions from '../state/actions/notes.actions';
import { chosenNotesData, errorMessage } from '../state/reducers/notes.reducer';

import { keyboardNotesSharp, keyboardNotesFlat } from '../notes-data';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-notes-options',
  templateUrl: './notes-options.component.html',
  styleUrls: ['./notes-options.component.css'],
})
export class NotesOptionsComponent implements OnInit {
  chosenNotes$!: Observable<Note[]>;
  allNotes!: KeyboardNote[];
  errorMessage$!: Observable<string>;

  constructor(private store: Store, private audioService: AudioService) {}

  ngOnInit(): void {
    this.chosenNotes$ = this.store.select(chosenNotesData);
    this.allNotes = keyboardNotesSharp;
    this.errorMessage$ = this.store.select(errorMessage);
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
