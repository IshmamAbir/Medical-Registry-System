import { TestBed } from '@angular/core/testing';

import { MedicaldataService } from './medicaldata.service';

describe('MedicaldataService', () => {
  let service: MedicaldataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicaldataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
