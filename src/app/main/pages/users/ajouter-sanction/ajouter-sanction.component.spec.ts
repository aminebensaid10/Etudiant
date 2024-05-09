import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterSanctionComponent } from './ajouter-sanction.component';

describe('AjouterSanctionComponent', () => {
  let component: AjouterSanctionComponent;
  let fixture: ComponentFixture<AjouterSanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterSanctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
