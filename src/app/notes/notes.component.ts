import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from './note';
import { notesData } from './notes-data';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[] = notesData;
  constructor() { }

  ngOnInit(): void {

  }



}
