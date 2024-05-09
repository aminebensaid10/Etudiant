import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemanderDocumentComponent } from './demander-document.component';

describe('DemanderDocumentComponent', () => {
  let component: DemanderDocumentComponent;
  let fixture: ComponentFixture<DemanderDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemanderDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemanderDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
