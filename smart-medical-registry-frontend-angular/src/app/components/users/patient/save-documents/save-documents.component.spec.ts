import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDocumentsComponent } from './save-documents.component';

describe('SaveDocumentsComponent', () => {
  let component: SaveDocumentsComponent;
  let fixture: ComponentFixture<SaveDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
