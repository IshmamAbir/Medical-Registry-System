import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BkashComponent } from './bkash.component';

describe('BkashComponent', () => {
  let component: BkashComponent;
  let fixture: ComponentFixture<BkashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BkashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BkashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
