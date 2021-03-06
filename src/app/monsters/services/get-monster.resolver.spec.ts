import {async, inject, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ResolvedValue} from '../../shared/types/resolved-value.type';
import {MonsterService} from './monster.service';
import {GetMonsterResolver} from './get-monster.resolver';
import {EditMonsterComponent} from '../edit-monster/edit-monster.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ActivatedRouteStub} from '../../../../test/activated-route.stub';

describe('GetMonsterResolverService', () => {

  const REST_API_URI = 'http://localhost:8080/';
  const data = {
    firstName: 'homer',
    lastName: 'simpson',
    email: 'moo@cow.com',
    username: 'hsimpson',
    imageFile: 'icon11.png'
  };

  // set expectations for successful resolve, i.e. data is returned
  const successfulResolve = new ResolvedValue(data);

  // set expectations for failed resolve, i.e. error is thrown
  const ERROR_MESSAGE = 'Unknown Error';
  const ERROR_STATUS = 0;
  const customError = new HttpErrorResponse({status: ERROR_STATUS, statusText: ERROR_MESSAGE});
  const resolvedError = new ResolvedValue(null, customError);

  let monstersService: MonsterService;
  let getMonsterResolver: GetMonsterResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [EditMonsterComponent],
      providers: [MonsterService, GetMonsterResolver,
        ]
    });
  });

  beforeEach(inject([MonsterService, GetMonsterResolver],
    (monsterServiceIn, GetMonsterResolverIn) => {
      monstersService = monsterServiceIn;
      getMonsterResolver = GetMonsterResolverIn;
    }));

  it('should be created', () => {
    expect(getMonsterResolver).toBeTruthy();
  });

  it('should handle successful data retrieval', async(() => {

    // mock response from server returned by service
    const obs = Observable.create(observer => {
      observer.next(data);
    });
    const spy = spyOn(monstersService, 'getMonster').and.returnValue(obs);

    // mock ActivatedRouterSnapshot
    let activatedRouteStub = new ActivatedRouteStub(null);
    let snapshotStub = activatedRouteStub.snapshot;

    // call resolver function
    const response = getMonsterResolver.resolve(snapshotStub as any);

    expect(response).toBeTruthy();
    response.subscribe(result => {
      expect(result).toBeTruthy();
      expect(result).toEqual(successfulResolve);
      expect(spy).toHaveBeenCalledWith('abc123');
    });

  }));

  it('should handle failure to retrieve data', () => {

    const err = Observable.throw(customError);
    const spy = spyOn(monstersService, 'getMonster').and.returnValue(err);

    // mock ActivatedRouterSnapshot
    let activatedRouteStub = new ActivatedRouteStub(null);
    let snapshotStub = activatedRouteStub.snapshot;

    const response = getMonsterResolver.resolve(snapshotStub as any);
    expect(response).toBeTruthy();
    response.subscribe(result => {
      expect(result).toBeTruthy();
      expect(result).toEqual(resolvedError);
      expect(spy).toHaveBeenCalled();
    });

  });

});
