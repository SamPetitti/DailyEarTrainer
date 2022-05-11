import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { pipe, tap } from 'rxjs';

import { NotesScenariosService } from './notes-scenarios.service';

describe('NotesScenariosService', () => {
  let service: NotesScenariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClient],
      providers: [{provide: HttpClient, useValue: HttpClient}]
    });
    service = TestBed.inject(NotesScenariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get scenarios', () => {
    service.$scenario.pipe(tap((t) => console.log(t))).subscribe();
  });
});
