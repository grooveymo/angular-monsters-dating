import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditMonsterComponent} from './edit-monster.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MonsterService} from '../services/monster.service';
import {Monster} from '../models/monster.model';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../../../../test/activated-route.stub';
import {ResolvedValue} from '../../shared/types/resolved-value.type';
import {By} from '@angular/platform-browser';

/**
 * I've not implemented any field validation or form submission tests, because the form component here is
 * identical to the one presented on the AddMonsters page which provides more rigorous testing.
 * Both AddMonster and EditMonster pages could be refactored to use a common component.
 */
describe('EditMonsterComponent', () => {
  let component: EditMonsterComponent;
  let fixture: ComponentFixture<EditMonsterComponent>;
  const monster = new Monster('firstName', 'lastName', 'first@lastname.com', 'username', 'icon01.png');
  const ERROR_MESSAGE = 'Unknown Error';
  const ERROR_STATUS = 0;

  // declare mock for successful data retrieval, i.e. sunny day scenario
  const resolvedValue = new ResolvedValue(monster);
  const dataResponse = {monsterData: resolvedValue};
  const activatedRouteStubWithSuccess = new ActivatedRouteStub(dataResponse);

  // declare mock for failed data retrieval, i.e. rainy day scenario
  const customError = new HttpErrorResponse({status: ERROR_STATUS, statusText: ERROR_MESSAGE});
  const resolvedError = new ResolvedValue(null, customError);
  const errorResponse = {monsterData: resolvedError};
  const activatedRouteStubWithFailure = new ActivatedRouteStub(errorResponse);

  describe('after a successful resolve, ', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
        declarations: [ EditMonsterComponent ],
        providers: [MonsterService,
          {provide: ActivatedRoute, useValue: activatedRouteStubWithSuccess}]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(EditMonsterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();

      // expect error status to be false
      expect(component.fetchError).toBeFalsy();
    });

    it('form should be populated & valid at the start', () => {

      // trigger changes
      fixture.detectChanges();

      expect(component.editMonsterForm.valid).toBeTruthy();
      expect(component.editMonsterForm.get('name.firstName').value).toBe('firstName');
      expect(component.editMonsterForm.get('name.lastName').value).toBe('lastName');
      expect(component.editMonsterForm.get('email').value).toBe('first@lastname.com');
      expect(component.editMonsterForm.get('username').value).toBe('username');
      expect(component.editMonsterForm.get('imageFile').value).toBe('icon01.png');
    });

  });

  describe('after a failed resolve, ', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
        declarations: [ EditMonsterComponent ],
        providers: [MonsterService,
          {provide: ActivatedRoute, useValue: activatedRouteStubWithFailure}]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(EditMonsterComponent);
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

      let el = fixture.debugElement.query(By.css('.alert')).nativeElement;
      const actualMessage = el.textContent.trim();

      let expectedMessage = `There was a problem retrieving data. Please try again and contact an administrator if this problem persists.`;

      expect(el).toBeTruthy();
      expect(actualMessage).toEqual(expectedMessage);

    });

  });


});


