import { TestBed } from '@angular/core/testing';

import { BuildingResolver } from './building.resolver';

describe('BuildingResolver', () => {
  let resolver: BuildingResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BuildingResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
