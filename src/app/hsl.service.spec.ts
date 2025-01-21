import { TestBed } from '@angular/core/testing';

import { HslService } from './hsl.service';

describe('HslService', () => {
  let service: HslService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HslService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
