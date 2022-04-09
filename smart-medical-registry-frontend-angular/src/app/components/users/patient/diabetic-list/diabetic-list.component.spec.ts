import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabeticListComponent } from './diabetic-list.component';

describe('DiabeticListComponent', () => {
  let component: DiabeticListComponent;
  let fixture: ComponentFixture<DiabeticListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiabeticListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiabeticListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
