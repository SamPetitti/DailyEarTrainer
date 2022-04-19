import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseNotesComponent } from './choose-notes.component';

describe('ChooseNotesComponent', () => {
  let component: ChooseNotesComponent;
  let fixture: ComponentFixture<ChooseNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
