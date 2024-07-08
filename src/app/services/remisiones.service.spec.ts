import { TestBed } from '@angular/core/testing';

import { RemisionesService } from './remisiones.service';

describe('RemisionesService', () => {
  let service: RemisionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemisionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
