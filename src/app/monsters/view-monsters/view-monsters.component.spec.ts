import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewMonstersComponent} from './view-monsters.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MonsterService} from '../services/monster.service';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {Monster} from '../models/monster.model';
import {ActivatedRouteStub} from '../../../../test/activated-route.stub';
import {ResolvedValue} from '../../shared/types/resolved-value.type';
import {ActivatedRoute} from '@angular/router';
import {By} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('ViewMonstersComponent', () => {
  let component: ViewMonstersComponent;
  let fixture: ComponentFixture<ViewMonstersComponent>;
  const monster = new Monster('firstName', 'lastName', 'first@lastname.com', 'username', 'icon01.png', 'abc123');
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

  describe('after a successful resolve, ', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
        declarations: [ ViewMonstersComponent ],
        providers: [MonsterService,
          {provide: ActivatedRoute, useValue: activatedRouteStubWithSuccess}],
        schemas:[NO_ERRORS_SCHEMA] // NOTE - have to supply this otherwise angular will complain
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

  });


  describe('after a failed resolve, ', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
        declarations: [ ViewMonstersComponent ],
        providers: [MonsterService,
          {provide: ActivatedRoute, useValue: activatedRouteStubWithFailure}],
        schemas:[NO_ERRORS_SCHEMA] // NOTE - have to supply this otherwise angular will complain
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
        declarations: [ ViewMonstersComponent ],
        providers: [MonsterService,
          {provide: ActivatedRoute, useValue: activatedRouteStubWithSuccessAndEmpty}],
        schemas:[NO_ERRORS_SCHEMA] // NOTE - have to supply this otherwise angular will complain
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

});
