import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotesScenarios } from '../notes-scenario';
import { filter, map, take, tap } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NotesScenariosService {
  constructor(
    private http: HttpClient,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  private scenariosPath = 'assets/data/notes-scenarios.json';
  scenario$ = this.http.get<NotesScenarios[]>(this.scenariosPath).pipe(
    map((scenarios) =>
      scenarios.find(
        (s) => s.date === formatDate(Date.now(), 'M/dd/YYYY', this.locale)
      )
    ),
    tap((s) =>
      console.log(
        `got the scenario! date: ${s?.date} scenarios: ${s?.scenarios}`
      )
    )
  );
  // $scenario = this.http
  //   .get<NotesScenarios[]>(this.scenariosPath)
  //   .pipe(tap((s) => ('scenarios: ' + s.forEach(s => console.log(`date ${s.date} scenarios ${s.scenarios}`)))));
}
