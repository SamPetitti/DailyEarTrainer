import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AudioService } from 'src/app/services/audio.service';
import { SubmitNotesService } from 'src/app/services/submit-notes.service';
import { Note, Notes } from '../note';
import { notesData } from '../notes-data';
import * as actions from '../state/actions/chooseNotes.actions';

@Component({
  selector: 'app-choose-notes',
  templateUrl: './choose-notes.component.html',
  styleUrls: ['./choose-notes.component.css'],
})
export class ChooseNotesComponent implements OnInit {
  notes$: Observable<Notes>;
  chosenNotes: Note[] = [];
  errorMessage: string = '';
  correctNotesChosen: boolean = false;
  constructor(
    private submitNotesService: SubmitNotesService,
    private audioService: AudioService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.notes$ = this.store.select(chosenNotesData)
  }

  add(note: Note) {
    // this.store.dispatch(actions.noteChosen({ payload: { note } }));
  }

  removeNote(): void {
    this.chosenNotes.pop();
  }

  submitNotes(): void {
    if (this.chosenNotes.length != 5) {
      return;
    }
    this.submitNotesService.addChosenNoteGroup(this.chosenNotes);
    this.correctNotesChosen =
      this.audioService.verifyNotesChosenAgainstAudioNotes(this.chosenNotes);
    if (this.correctNotesChosen) {
      alert('you chose correct notes!');
    }
    this.chosenNotes = [];
  }

  playMelody(): void {
    this.audioService.playAudio();
  }
}
