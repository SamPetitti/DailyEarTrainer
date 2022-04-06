import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor() { }

  ngOnInit(): void {

  }

  add(note: Note): void {
    this.chosenNotes.push(note)
  }


}
