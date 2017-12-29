import {async, inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ReactiveFormsModule} from '@angular/forms';

import {ResolvedValue} from '../../shared/types/resolved-value.type';
import {MonsterService} from './monster.service';
import {ActivatedRouteStub} from '../../../../test/activated-route.stub';
import {GetMonstersResolver} from './get-monsters.resolver';
import {ViewMonstersComponent} from '../view-monsters/view-monsters.component';

describe('GetMonstersResolverService', () => {

  const data = [{
    firstName: 'homer',
    lastName: 'simpson',
    email: 'moo@cow.com',
    username: 'hsimpson',
    imageFile: 'icon11.png'
  }];

  // set expectations for successful resolve, i.e. data is returned
  const successfulResolve = new ResolvedValue(data);

  // set expectations for failed resolve, i.e. error is thrown
  const ERROR_MESSAGE = 'Unknown Error';
  const ERROR_STATUS = 0;
  const customError = new HttpErrorResponse({status: ERROR_STATUS, statusText: ERROR_MESSAGE});
  const resolvedError = new ResolvedValue(null, customError);

  let monstersService: MonsterService;
  let getMonstersResolver: GetMonstersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [ViewMonstersComponent],
      providers: [MonsterService, GetMonstersResolver],
      schemas: [NO_ERRORS_SCHEMA] // NOTE - have to supply this otherwise angular will complain
    });
  });

  beforeEach(inject([MonsterService, GetMonstersResolver],
    (monsterServiceIn, GetMonstersResolverIn) => {
      monstersService = monsterServiceIn;
      getMonstersResolver = GetMonstersResolverIn;
    }));

  it('should be created', () => {
    expect(getMonstersResolver).toBeTruthy();
  });

  it('should handle successful data retrieval', async(() => {

    // mock response from server returned by service
    const obs = Observable.create(observer => {
      observer.next(data);
    });
    const spy = spyOn(monstersService, 'getMonsters').and.returnValue(obs);

    // mock ActivatedRouterSnapshot
    let activatedRouteStub = new ActivatedRouteStub(null);

    // call resolver function
    const response = getMonstersResolver.resolve();

    expect(response).toBeTruthy();
    response.subscribe(result => {
      expect(result).toBeTruthy();
      expect(result).toEqual(successfulResolve);
      expect(spy).toHaveBeenCalled();
    });

  }));

  it('should handle failure to retrieve data', () => {

    const err = Observable.throw(customError);
    const spy = spyOn(monstersService, 'getMonsters').and.returnValue(err);

    // mock ActivatedRouterSnapshot
    let activatedRouteStub = new ActivatedRouteStub(null);

    const response = getMonstersResolver.resolve();
    expect(response).toBeTruthy();
    response.subscribe(result => {
      expect(result).toBeTruthy();
      expect(result).toEqual(resolvedError);
      expect(spy).toHaveBeenCalled();
    });

  });

});
