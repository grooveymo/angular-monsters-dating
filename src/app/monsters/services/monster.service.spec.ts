import {TestBed, inject} from '@angular/core/testing';

import {MonsterService} from './monster.service';
import {MONSTERS_REST_API} from './monster.service';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Monster} from '../models/monster.model';
import {Observable} from 'rxjs/Observable';

describe('MonsterService', () => {

  let service: MonsterService;
  let httpMock: HttpTestingController;
  const id = 'abc123';

  const monsterWithNoId = new Monster('freddie', 'krueger', 'freddie@nails-salon.com',
    'freddie', 'icon09.png');

  const monsterWithId = new Monster('freddie', 'krueger', 'freddie@nails-salon.com',
    'freddie', 'icon09.png', id);

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


  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', inject([MonsterService], (service: MonsterService) => {
    expect(service).toBeTruthy();
  }));


  // TODO - test updateMonster for sunny day scenario
  it('updateMonster() should successfully PUT new monster details to server', () => {

    const updatedMonster = Object.assign({}, monsterWithId);
    updatedMonster.email = 'changed@email.com';
    console.log('update: ', updatedMonster);

    service.updateMonster(updatedMonster).subscribe((res) => {
      console.log('res ==> : ', res);
      expect(res).toBe(updatedMonster);
    });

    const request = httpMock.expectOne(MONSTERS_REST_API+ '/' + id) ; // instance of TestRequest
    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.get('Content-Type')).toBe('application/json');
    console.log('1.) body: ', request.request.body);

    request.flush(updatedMonster,{status: 200, statusText: 'Ok'});

    console.log('2.) body: ', request.request.body);

  });

  // TODO - test updateMonster for rainy day scenario
  // TODO - test removeMonster for sunny day scenario
  // TODO - test removeMonster for rainy day scenario


  it('addMonster() should successfully POST new monster details to server', () => {

    service.addMonster(monsterWithNoId).subscribe((res) => {
      expect(res).toBe(monsterWithId);
    });

    const request = httpMock.expectOne(MONSTERS_REST_API); // instance of TestRequest
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Content-Type')).toBe('application/json');

    request.flush(monsterWithId,{status: 200, statusText: 'Ok'});
  });
  it('addMonster() should return error if experiencing server side problems', () => {

    service.addMonster(monsterWithNoId).subscribe(() => {
      },
      err => {
        expect(err).toBeTruthy();
        expect(err.status).toBe(500);
        expect(err.statusText).toBe('Internal Server problems');
      });

    const request = httpMock.expectOne(MONSTERS_REST_API); // instance of TestRequest
    expect(request.request.headers.get('Content-Type')).toBe('application/json');
    request.error(new ErrorEvent('error'), {status: 500, statusText: 'Internal Server problems'});

    expect(request.request.method).toBe('POST');

  });
  it('getMonsters() should return monster array', () => {

    service.getMonsters().subscribe((monstersIn) => {
      expect(monstersIn).toBe(monsters);
      expect(monstersIn.length).toBe(1);
    });

    const request = httpMock.expectOne(MONSTERS_REST_API);
    expect(request.request.method).toBe('GET');
    request.flush(monsters);

  });
  it('getMonsters() should return empty array if there are no monsters in the database', () => {

    service.getMonsters().subscribe((monstersIn) => {
      expect(monstersIn).toEqual([]);
      expect(monstersIn.length).toBe(0);
    });

    const request = httpMock.expectOne(MONSTERS_REST_API);
    expect(request.request.method).toBe('GET');
    request.flush([]);

  });
  it('getMonster() should return single monster for a valid id', () => {

    service.getMonster(id).subscribe((monster) => {
      expect(monster).toBe(monsterWithId);
    });

    const request = httpMock.expectOne(MONSTERS_REST_API + '/' + id);
    expect(request.request.method).toBe('GET');
    request.flush(monsterWithId);

  });
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
