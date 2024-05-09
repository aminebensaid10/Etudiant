import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterReclamationAbsenceComponent } from './ajouter-reclamation-absence.component';

describe('AjouterReclamationAbsenceComponent', () => {
  let component: AjouterReclamationAbsenceComponent;
  let fixture: ComponentFixture<AjouterReclamationAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterReclamationAbsenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterReclamationAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
