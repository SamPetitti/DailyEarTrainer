import { Component, OnInit } from '@angular/core';
import { Note, NotesList } from '../note';
import { SubmitNotesService } from '../../../services/submit-notes.service';
import { AudioService } from 'src/app/services/audio.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { submittedNoteChoices } from '../state/reducers/notes.reducer';
import { Factory, Vex } from 'vexflow';

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
    this.drawNotes();
    //this.drawNotes2();
  }

  drawNotes(): void {
    const vf = new Factory({
      renderer: { elementId: 'output', width: 500, height: 200 },
    });

    const score = vf.EasyScore();
    const system = vf.System();
    const notesGroups: string[][] = [
      ['C#5/q, B4, A4, G#4'],
      ['C#5/q, B4, A4, G#4'],
    ];
    notesGroups.forEach((element) => {
      system
        .addStave({
          voices: [
            score.voice(score.notes(element.toString(), { stem: 'up' })),
          ],
        })
        .addClef('treble')
        .addTimeSignature('4/4');
    });
    vf.draw();
  }
}
