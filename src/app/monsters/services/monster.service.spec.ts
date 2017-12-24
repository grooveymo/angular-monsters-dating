import { TestBed, inject } from '@angular/core/testing';

import { MonsterService } from './monster.service';
import {HttpClientModule} from '@angular/common/http';

describe('MonsterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MonsterService]
    });
  });

  it('should be created', inject([MonsterService], (service: MonsterService) => {
    expect(service).toBeTruthy();
  }));
});
