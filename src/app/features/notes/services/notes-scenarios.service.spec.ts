import { HttpClient, HttpClientModule } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { map, pipe, tap } from 'rxjs';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { NotesScenariosService } from './notes-scenarios.service';

describe('NotesScenariosService', () => {
  let service: NotesScenariosService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [NotesScenariosService],
    });
    service = TestBed.inject(NotesScenariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get scenarios', () => {
    service.$scenario.subscribe((d) => expect(d?.date).toBe('5/12/2022'));
  });
});
