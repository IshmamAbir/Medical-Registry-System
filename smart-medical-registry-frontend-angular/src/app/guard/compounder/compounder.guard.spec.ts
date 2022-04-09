import { TestBed } from '@angular/core/testing';

import { CompounderGuard } from './compounder.guard';

describe('CompounderGuard', () => {
  let guard: CompounderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompounderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
