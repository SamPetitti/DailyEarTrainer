import { TestBed } from '@angular/core/testing';

import { SubmitNotesService } from './submit-notes.service';

describe('SubmitNotesService', () => {
  let service: SubmitNotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubmitNotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
