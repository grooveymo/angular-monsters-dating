import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {ViewMonstersComponent} from './view-monsters.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MonsterService} from '../services/monster.service';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {Monster} from '../models/monster.model';
import {ActivatedRouteStub} from '../../../../test/activated-route.stub';
import {ResolvedValue} from '../../shared/types/resolved-value.type';
import {ActivatedRoute, Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import createSpyObj = jasmine.createSpyObj;
import {Observable} from 'rxjs/Observable';
import {CardComponent} from '../../shared/card/card.component';
import {CapitalizeNamePipe} from '../../shared/pipes/capitalize-name.pipe';

describe('ViewMonstersComponent', () => {
  let component: ViewMonstersComponent;
  let fixture: ComponentFixture<ViewMonstersComponent>;
  const monster = new Monster('firstName', 'lastName', 'first@lastname.com',
    'username', 'icon01.png', 'something cheesy', 'abc123');
  const ERROR_MESSAGE = 'Unknown Error';
  const ERROR_STATUS = 0;

  // declare mock for successful data retrieval, i.e. sunny day scenario
  const resolvedValue = new ResolvedValue([monster]);
  const dataResponse = {monstersData: resolvedValue};
  const activatedRouteStubWithSuccess = new ActivatedRouteStub(dataResponse);

  // declare mock for failed data retrieval, i.e. rainy day scenario
  const customError = new HttpErrorResponse({status: ERROR_STATUS, statusText: ERROR_MESSAGE});
  const resolvedError = new ResolvedValue(null, customError);
  const errorResponse = {monstersData: resolvedError};
  const activatedRouteStubWithFailure = new ActivatedRouteStub(errorResponse);

  // declare mock for successful data retrieval with zero results, i.e. rainy day scenario
  const resolvedValueEmpty = new ResolvedValue([]);
  const dataResponseEmpty = {monstersData: resolvedValueEmpty};
  const activatedRouteStubWithSuccessAndEmpty = new ActivatedRouteStub(dataResponseEmpty);

  //============================================================================================================
  // Shallow tests
  // These tests will focus solely on the target component (ViewMonstersComponent)
  //============================================================================================================

  describe('after a successful resolve, ', () => {

    let monsterService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
        declarations: [ViewMonstersComponent],
        providers: [MonsterService,
          {provide: ActivatedRoute, useValue: activatedRouteStubWithSuccess}],
        schemas: [NO_ERRORS_SCHEMA] // NOTE - have to supply this otherwise angular will complain
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ViewMonstersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(inject([MonsterService],
      (monsterServiceIn) => {
        monsterService = monsterServiceIn;
      }));

    it('should create', () => {
      expect(component).toBeTruthy();

      // expect error status to be false
      expect(component.fetchError).toBeFalsy();

      // expect resolve to return single monster data
      expect(component.monsters.length).toBe(1);

    });

    it('should display details for single monster', () => {

      // trigger changes
      fixture.detectChanges();

      // expect 'No monsters in database' message to not exist in DOM
      const noMonsterMessage = fixture.nativeElement.querySelector('#noMonstersMessage');
      expect(noMonsterMessage).toBeNull();

      // expect error message to not exist in DOM
      const errorMessage = fixture.nativeElement.querySelector('#errorMessage');
      expect(errorMessage).toBeNull();

      let cardElement = fixture.debugElement.query(By.css('app-card')).nativeElement;
      expect(cardElement).toBeTruthy();

      // expect child component to receive data for single monster returned by resolve
      expect(cardElement['data-input']).toBe(monster);
    });

    it('should be able to remove Monster', () => {

      // create spy for monsterService.remove()
      const obs = Observable.create(observer => {
        observer.next({message: 'success', status: 200});
      });
      let mockMonsterServiceSpy = spyOn(monsterService, 'removeMonster').and.returnValue(obs);

      // create spy for router.navigate()
      let router = TestBed.get(Router);
      let navigateSpy = spyOn(router, 'navigate');

      // invoke removal
      component.removeMonster('abc123');

      expect(mockMonsterServiceSpy).toHaveBeenCalledWith('abc123');
      expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    });

    it('should be able to edit Monster', () => {

      // create spy for router.navigate()
      let router = TestBed.get(Router);
      let navigateSpy = spyOn(router, 'navigate');

      // invoke edit
      component.editMonster('abc123');

      expect(navigateSpy).toHaveBeenCalledWith(['/edit-monster/', 'abc123']);
    });

  });

  describe('after a failed resolve, ', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
        declarations: [ViewMonstersComponent],
        providers: [MonsterService,
          {provide: ActivatedRoute, useValue: activatedRouteStubWithFailure}],
        schemas: [NO_ERRORS_SCHEMA] // NOTE - have to supply this otherwise angular will complain
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ViewMonstersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();

      // expect error status to be true
      expect(component.fetchError).toBeTruthy();
    });

    it('form should display error message', () => {

      // trigger changes
      fixture.detectChanges();

      // expect card not to not exist in DOM
      const cardElement = fixture.debugElement.query(By.css('app-card'));
      expect(cardElement).toBeNull();

      // expect 'No monsters in database message to not exist in DOM
      const noMonsterMessage = fixture.nativeElement.querySelector('#noMonstersMessage');
      expect(noMonsterMessage).toBeNull();


      const errorMessage = fixture.nativeElement.querySelector('#errorMessage');
      expect(errorMessage).toBeTruthy();

      const actualMessage = errorMessage.textContent.trim();

      let expectedMessage = `There was a problem retrieving data. Please try again and contact an administrator if this problem persists.`;
      expect(actualMessage).toEqual(expectedMessage);

    });

  });

  describe('after a successful resolve with no entries in database, ', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
        declarations: [ViewMonstersComponent],
        providers: [MonsterService,
          {provide: ActivatedRoute, useValue: activatedRouteStubWithSuccessAndEmpty}],
        schemas: [NO_ERRORS_SCHEMA] // NOTE - have to supply this otherwise angular will complain
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ViewMonstersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();

      // expect error status to be false
      expect(component.fetchError).toBeFalsy();

      // expect resolve to return single monster data
      expect(component.monsters.length).toBe(0);

    });

    it('should display error message', () => {

      // trigger changes
      fixture.detectChanges();

      let cardElement = fixture.debugElement.query(By.css('app-card'));
      expect(cardElement).toBeNull();

      const errorMessage = fixture.nativeElement.querySelector('#errorMessage');
      expect(errorMessage).toBeNull();

      // expect child component to receive data for single monster returned by resolve
      const noMonsterMessage = fixture.nativeElement.querySelector('#noMonstersMessage');
      expect(noMonsterMessage).toBeTruthy();
      expect(noMonsterMessage.textContent.trim()).toBe('There are no monsters in the database at the moment. Please add one');

    });

  });

  //============================================================================================================
  // Integration tests
  // These tests will check that the coupling between the parent component (ViewMonstersComponent)
  // and child Components (CardComponents) works as expected. These tests will confirm that in the event
  // of a successful resolve, data for a single monster is passed from the parent to the child component.
  // Additionally edit/remove buttons exposed by the child will correctly invoke functions defined in the
  // parent component.
  //============================================================================================================
  describe('after a successful resolve (integration tests) ', () => {

    let monsterService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
        declarations: [ViewMonstersComponent, CardComponent, CapitalizeNamePipe],
        providers: [MonsterService,
          {provide: ActivatedRoute, useValue: activatedRouteStubWithSuccess}],
        // schemas: [NO_ERRORS_SCHEMA] // No longer required since we're performing integration style testing and have
        // declared the other components/pipes above
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ViewMonstersComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(inject([MonsterService],
      (monsterServiceIn) => {
        monsterService = monsterServiceIn;
      }));

    it('should create', () => {
      expect(component).toBeTruthy();

      // expect error status to be false
      expect(component.fetchError).toBeFalsy();

      // expect resolve to return single monster data
      expect(component.monsters.length).toBe(1);

    });

    // This test confirms that data passed to the parent component will in turn be passed to the child component
    // as proven by a successful render of the child component.
    it('should display details for single monster (will test flow of data from parent to child component)',
      () => {

        // trigger changes
        fixture.detectChanges();

        // expect 'No monsters in database' message to not exist in DOM
        const noMonsterMessage = fixture.nativeElement.querySelector('#noMonstersMessage');
        expect(noMonsterMessage).toBeNull();

        // expect error message to not exist in DOM
        const errorMessage = fixture.nativeElement.querySelector('#errorMessage');
        expect(errorMessage).toBeNull();


        // expect child component (<app-card>) to receive data for single monster returned by resolve
        let childCardElement = fixture.debugElement.query(By.css('app-card'));
        expect(childCardElement).toBeTruthy();

        const usernameElement = childCardElement.query(By.css('h4')).nativeElement;
        expect(usernameElement.textContent).toBe(monster.username);

        const listElement = childCardElement.queryAll(By.css('.list-group-item'));

        const nameElement = listElement[0].nativeElement;
        expect(nameElement.textContent).toBe('FirstName LastName');

        const emailElement = listElement[1].nativeElement;
        expect(emailElement.textContent).toBe(monster.email);

        const catchlineElement = listElement[2].nativeElement;
        expect(catchlineElement.textContent).toBe(monster.catchline);


      });

    // Note the remove button on the card component emits an event to the parent component to perform the removal.
    it('should be able to remove Monster', () => {

      // create spy for monsterService.remove()
      const obs = Observable.create(observer => {
        observer.next({message: 'success', status: 200});
      });
      let mockMonsterServiceSpy = spyOn(monsterService, 'removeMonster').and.returnValue(obs);

      // create spy for router.navigate()
      let navigateSpy = spyOn((<any>component).router, 'navigate');

      // invoke removal
      // expect child component (<app-card>) to be populated with data for single monster returned by resolve
      // for parent component
      let childCardElement = fixture.debugElement.query(By.css('app-card'));
      expect(childCardElement).toBeTruthy();

      const button = childCardElement.query(By.css('button.btn-danger'));
      button.nativeElement.click();

      // remainder
      expect(mockMonsterServiceSpy).toHaveBeenCalledWith('abc123');
      expect(navigateSpy).toHaveBeenCalledWith(['/home']);
    });

    // Note the edit button on the card component emits an event to the parent component to perform the redirect to
    // the edit monsters page.
    it('should be able to edit Monster', () => {

      // create spy for router.navigate()
      let router = TestBed.get(Router);
      let navigateSpy = spyOn(router, 'navigate');

      // invoke edit
      let childCardElement = fixture.debugElement.query(By.css('app-card'));
      expect(childCardElement).toBeTruthy();

      const button = childCardElement.query(By.css('button.btn-primary'));
      button.nativeElement.click();

      expect(navigateSpy).toHaveBeenCalledWith(['/edit-monster/', 'abc123']);
    });

  });

});
