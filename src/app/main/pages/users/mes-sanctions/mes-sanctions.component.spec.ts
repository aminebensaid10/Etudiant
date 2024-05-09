import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesSanctionsComponent } from './mes-sanctions.component';

describe('MesSanctionsComponent', () => {
  let component: MesSanctionsComponent;
  let fixture: ComponentFixture<MesSanctionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesSanctionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesSanctionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
