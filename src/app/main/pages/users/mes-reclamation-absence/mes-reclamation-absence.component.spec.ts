import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesReclamationAbsenceComponent } from './mes-reclamation-absence.component';

describe('MesReclamationAbsenceComponent', () => {
  let component: MesReclamationAbsenceComponent;
  let fixture: ComponentFixture<MesReclamationAbsenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesReclamationAbsenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesReclamationAbsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
