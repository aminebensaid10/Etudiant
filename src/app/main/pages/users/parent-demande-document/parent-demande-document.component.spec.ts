import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentDemandeDocumentComponent } from './parent-demande-document.component';

describe('ParentDemandeDocumentComponent', () => {
  let component: ParentDemandeDocumentComponent;
  let fixture: ComponentFixture<ParentDemandeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentDemandeDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentDemandeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
