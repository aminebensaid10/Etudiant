import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAbsenceComponent } from './ajouter-absence.component';

describe('AjouterAbsenceComponent', () => {
  let component: AjouterAbsenceComponent;
  let fixture: ComponentFixture<AjouterAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterAbsenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
