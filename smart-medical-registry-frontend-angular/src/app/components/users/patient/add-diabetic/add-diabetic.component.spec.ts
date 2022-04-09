import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiabeticComponent } from './add-diabetic.component';

describe('AddDiabeticComponent', () => {
  let component: AddDiabeticComponent;
  let fixture: ComponentFixture<AddDiabeticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiabeticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiabeticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
