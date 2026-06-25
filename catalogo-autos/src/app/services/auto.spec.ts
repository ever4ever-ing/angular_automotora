import { TestBed } from '@angular/core/testing';

import { Auto } from './auto';

describe('Auto', () => {
  let service: Auto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Auto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
