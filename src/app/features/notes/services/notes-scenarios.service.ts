import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotesScenario } from '../notes-scenario';
import { filter, take, tap } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class NotesScenariosService {
  constructor(
    private client: HttpClient,
    @Inject(LOCALE_ID) private locale: string
  ) {}

  $scenario = this.client
    .get<NotesScenario>('../../../../notes-scenarios.json')
    .pipe(
      filter(
        (s) => s.date === formatDate(Date.now(), 'yyyy/MM/dd', this.locale)
      ),
      tap((s) => console.log(`date: ${s.date} scenarios: ${s.scenarios}`))
    );
}
