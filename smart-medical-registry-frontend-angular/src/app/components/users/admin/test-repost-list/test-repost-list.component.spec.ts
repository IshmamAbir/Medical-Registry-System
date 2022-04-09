import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRepostListComponent } from './test-repost-list.component';

describe('TestRepostListComponent', () => {
  let component: TestRepostListComponent;
  let fixture: ComponentFixture<TestRepostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestRepostListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRepostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
