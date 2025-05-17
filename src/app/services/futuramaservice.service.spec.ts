import { TestBed } from '@angular/core/testing';

import { FuturamaserviceService } from './futuramaservice.service';

describe('FuturamaserviceService', () => {
  let service: FuturamaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuturamaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
