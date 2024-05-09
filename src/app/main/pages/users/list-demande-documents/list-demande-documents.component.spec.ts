import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDemandeDocumentsComponent } from './list-demande-documents.component';

describe('ListDemandeDocumentsComponent', () => {
  let component: ListDemandeDocumentsComponent;
  let fixture: ComponentFixture<ListDemandeDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDemandeDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDemandeDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
