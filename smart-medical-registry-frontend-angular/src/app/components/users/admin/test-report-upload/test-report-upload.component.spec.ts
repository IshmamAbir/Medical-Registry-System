import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportUploadComponent } from './test-report-upload.component';

describe('TestReportUploadComponent', () => {
  let component: TestReportUploadComponent;
  let fixture: ComponentFixture<TestReportUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestReportUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReportUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
