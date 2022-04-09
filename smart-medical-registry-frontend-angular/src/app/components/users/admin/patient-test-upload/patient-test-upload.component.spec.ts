import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTestUploadComponent } from './patient-test-upload.component';

describe('PatientTestUploadComponent', () => {
  let component: PatientTestUploadComponent;
  let fixture: ComponentFixture<PatientTestUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientTestUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTestUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
