import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrscriptionListComponent } from './prscription-list.component';

describe('PrscriptionListComponent', () => {
  let component: PrscriptionListComponent;
  let fixture: ComponentFixture<PrscriptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrscriptionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrscriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
