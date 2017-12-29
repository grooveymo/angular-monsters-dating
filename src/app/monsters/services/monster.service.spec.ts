import {TestBed, inject} from '@angular/core/testing';

import {MonsterService} from './monster.service';
import {MONSTERS_REST_API} from './monster.service';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Monster} from '../models/monster.model';

describe('MonsterService', () => {

  let service: MonsterService;
  let httpMock: HttpTestingController;
  const id = 'abc123';

  const monsterWithNoId = new Monster('firstName', 'lastName', 'first@lastname.com',
    'username', 'icon01.png');

  const monsterWithId = new Monster('firstName', 'lastName', 'first@lastname.com',
    'username', 'icon01.png', id);

  const monsters = [monsterWithId];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [MonsterService]
    });
  });

  beforeEach(inject([HttpTestingController, MonsterService],
    (httpMockIn, monsterService) => {
      httpMock = httpMockIn;
      service = monsterService;
    }));

  // afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
  //   httpMock.verify();
  // }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([MonsterService], (service: MonsterService) => {
    expect(service).toBeTruthy();
  }));

  // TODO - test addMonster for sunny day scenario
  // TODO - test addMonster for rainy day scenario
  // TODO - test updateMonster for sunny day scenario
  // TODO - test updateMonster for rainy day scenario
  // TODO - test removeMonster for sunny day scenario
  // TODO - test removeMonster for rainy day scenario


  // TODO - test getMonsters for sunny day scenario
  it('getMonsters() should return monster array', () => {

    service.getMonsters().subscribe((monstersIn) => {
      expect(monstersIn).toBe(monsters);
      expect(monstersIn.length).toBe(1);
    });

    const request = httpMock.expectOne(MONSTERS_REST_API);
    expect(request.request.method).toBe('GET');
    request.flush(monsters);

  });

  // TODO - test getMonsters for rainy day scenario - no monsters in db
  it('getMonsters() should return empty array if there are no monsters in the database', () => {

    service.getMonsters().subscribe((monstersIn) => {
      expect(monstersIn).toEqual([]);
      expect(monstersIn.length).toBe(0);
    });

    const request = httpMock.expectOne(MONSTERS_REST_API);
    expect(request.request.method).toBe('GET');
    request.flush([]);

  });

  // TODO - test getMonster for sunny day scenario
  it('getMonster() should return single monster for a valid id', () => {

    service.getMonster(id).subscribe((monster) => {
      expect(monster).toBe(monsterWithId);
    });

    const request = httpMock.expectOne(MONSTERS_REST_API + '/' + id);
    expect(request.request.method).toBe('GET');
    request.flush(monsterWithId);

  });

  // TODO - test getMonster for rainy day scenario
  it('getMonster() should return 404 if monster does not exist on server', () => {

    service.getMonster(id).subscribe(() => {
      },
      err => {
        expect(err).toBeTruthy();
        expect(err.status).toBe(404);
        expect(err.statusText).toBe('No such monster exists');
      });

    const request = httpMock.expectOne(MONSTERS_REST_API + '/' + id);

    request.error(new ErrorEvent('error'), {status: 404, statusText: 'No such monster exists'});

    expect(request.request.method).toBe('GET');

  });


});
