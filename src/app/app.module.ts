import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseNotesComponent } from './notes/choose-notes/choose-notes.component';
import { NotesChosenComponent } from './notes/notes-chosen/notes-chosen.component';

@NgModule({
  declarations: [
    AppComponent,
    ChooseNotesComponent,
    NotesChosenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
