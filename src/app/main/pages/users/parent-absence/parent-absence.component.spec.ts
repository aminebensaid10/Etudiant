import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentAbsenceComponent } from './parent-absence.component';

describe('ParentAbsenceComponent', () => {
  let component: ParentAbsenceComponent;
  let fixture: ComponentFixture<ParentAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentAbsenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
