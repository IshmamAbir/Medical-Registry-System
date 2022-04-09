import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBloodPressureComponent } from './add-blood-pressure.component';

describe('AddBloodPressureComponent', () => {
  let component: AddBloodPressureComponent;
  let fixture: ComponentFixture<AddBloodPressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBloodPressureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBloodPressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
