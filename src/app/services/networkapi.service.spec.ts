import { TestBed } from '@angular/core/testing';

import { NetworkApiService } from './networkapi.service';

describe('NetworkApiService', () => {
  let service: NetworkApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
