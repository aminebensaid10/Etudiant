import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentSanctionComponent } from './parent-sanction.component';

describe('ParentSanctionComponent', () => {
  let component: ParentSanctionComponent;
  let fixture: ComponentFixture<ParentSanctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentSanctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentSanctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
