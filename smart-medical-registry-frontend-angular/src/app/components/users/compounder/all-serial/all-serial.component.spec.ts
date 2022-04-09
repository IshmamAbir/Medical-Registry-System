import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSerialComponent } from './all-serial.component';

describe('AllSerialComponent', () => {
  let component: AllSerialComponent;
  let fixture: ComponentFixture<AllSerialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSerialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
