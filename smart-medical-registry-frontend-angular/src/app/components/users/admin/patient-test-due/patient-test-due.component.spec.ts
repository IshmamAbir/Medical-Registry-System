import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientTestDueComponent } from './patient-test-due.component';

describe('PatientTestDueComponent', () => {
  let component: PatientTestDueComponent;
  let fixture: ComponentFixture<PatientTestDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientTestDueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientTestDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
