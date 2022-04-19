import { Component, OnInit } from '@angular/core';
import { ChooseNotesComponent } from './choose-notes/choose-notes.component';
import { NotesChosenComponent } from './notes-chosen/notes-chosen.component';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
