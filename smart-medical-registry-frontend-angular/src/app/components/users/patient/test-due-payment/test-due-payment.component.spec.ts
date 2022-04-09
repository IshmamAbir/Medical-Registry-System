import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDuePaymentComponent } from './test-due-payment.component';

describe('TestDuePaymentComponent', () => {
  let component: TestDuePaymentComponent;
  let fixture: ComponentFixture<TestDuePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestDuePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDuePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
