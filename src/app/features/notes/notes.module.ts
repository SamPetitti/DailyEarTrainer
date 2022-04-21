import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { ChooseNotesComponent } from './choose-notes/choose-notes.component';
import { NotesChosenComponent } from './notes-chosen/notes-chosen.component';
import { StoreModule } from '@ngrx/store';
import { featureName, notesReducer } from './state/reducers/notes.reducer';

// const routes: Routes = [
//   {
//     path: '',
//     component: NotesComponent,
//     children: [
//       path:'**',
//       component: NotesComponent
//     ]
//   }
// ]

const routes: Routes = [
  {
    path: '',
    component: NotesComponent,
    children: [
      {
        path: 'notes',
        component: ChooseNotesComponent,
      },
      { path: '**', redirectTo: 'notes' },
    ],
  },
];

@NgModule({
  declarations: [NotesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(featureName, notesReducer),
  ],
  exports: [RouterModule],
})
export class NotesModule {}
