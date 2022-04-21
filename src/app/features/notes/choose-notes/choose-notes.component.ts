import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';
import { SubmitNotesService } from 'src/app/services/submit-notes.service';
import { Note, NotesList } from '../note';
import { notesData } from '../notes-data';
import * as actions from '../state/actions/notes.actions';
import { chosenNotesData } from '../state/reducers/notes.reducer';
//import * from '../state/reducers'
//import *

@Component({
  selector: 'app-choose-notes',
  templateUrl: './choose-notes.component.html',
  styleUrls: ['./choose-notes.component.css'],
})
export class ChooseNotesComponent implements OnInit {
  chosenNotes$!: Observable<Note[]>;
  allNotes!: Note[];
  // errorMessage: string = '';
  //correctNotesChosen: boolean = false;
  constructor(
    private submitNotesService: SubmitNotesService,
    private audioService: AudioService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.chosenNotes$ = this.store.select(chosenNotesData);
    this.allNotes = notesData;
  }

  add(note: Note) {
    this.store.dispatch(actions.addNoteChosen({ payload: { note } }));
  }

  removeNote(): void {
    this.store.dispatch(actions.removeNoteChosen());
  }

  //todo: create effect
  // submitNotes(): void {
  //  this.store.dispatch(actions.SubmitNotes({payload: {notes: this.chosenNotes$.pipe(n => n.forEach())}))
  // }

  playMelody(): void {
    this.audioService.playAudio();
  }
}
