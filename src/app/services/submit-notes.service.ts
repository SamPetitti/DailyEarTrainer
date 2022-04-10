import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note, Notes } from '../notes/note';

@Injectable({
  providedIn: 'root'
})
export class SubmitNotesService {

  chosenNoteGroups: Notes[] = [];

  addChosenNoteGroup(notes: Note[]) {
    this.chosenNoteGroups.push(notes);
  }

  getChosenNoteGroups(): Observable<Notes[]> {
    const chosenNoteGroups = of(this.chosenNoteGroups);
    return chosenNoteGroups;
  }

  clear() {
    this.chosenNoteGroups = [];
  }
}
