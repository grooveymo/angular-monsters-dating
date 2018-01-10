import {AddMonsterComponent} from './add-monster.component';
import {MonsterService} from '../services/monster.service';
import {Router} from '@angular/router';
import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

import createSpyObj = jasmine.createSpyObj;

// =================================================================================
// isolated unit tests to check form validation works as expected
// =================================================================================

describe('AddMonsterComponent - isolated tests', () => {

  let component: AddMonsterComponent;
  let firstName;
  let lastName;
  let email;
  let username;


  beforeEach(() => {
    let mockMonsterService = createSpyObj('MonsterService', ['addMonster']);
    let mockRouter = createSpyObj('Router', ['navigate']);
    component = new AddMonsterComponent(mockMonsterService, mockRouter);
    component.ngOnInit();
  });

  it('form should be invalid at the start', () => {
    expect(component.addMonsterForm.valid).toBeFalsy();
  });

  describe('should validate firstName Field', () => {

    beforeEach(() => {
      firstName = component.addMonsterForm.get('name.firstName');
    });

    it('should accept legitimate value', () => {
      firstName.setValue('abcde');
      expect(firstName.valid).toBeTruthy();
      expect(firstName.errors).toBeNull();
    });

    it('should complain that field is required if empty', () => {
      firstName.setValue('');
      expect(firstName.valid).toBeFalsy();
      let errors = firstName.errors;
      expect(errors['required']).toBeTruthy();
    });

    it('should complain when supplied with a value shorter than min length', () => {
      firstName.setValue('abc');
      expect(firstName.valid).toBeFalsy();
      let errors = firstName.errors;
      expect(errors['minlength']).toBeTruthy();
    });

  });

  describe('should validate lastName Field', () => {

    beforeEach(() => {
      lastName = component.addMonsterForm.get('name.lastName');
    });

    it('should accept legitimate value', () => {
      lastName.setValue('abcde');
      expect(lastName.valid).toBeTruthy();
      expect(lastName.errors).toBeNull();
    });

    it('should complain that field is required if empty', () => {
      lastName.setValue('');
      expect(lastName.valid).toBeFalsy();
      let errors = lastName.errors;
      expect(errors['required']).toBeTruthy();
    });

    it('should complain when supplied with a value shorter than min length', () => {
      lastName.setValue('abc');
      expect(lastName.valid).toBeFalsy();
      let errors = lastName.errors;
      expect(errors['minlength']).toBeTruthy();
    });

  });

  describe('should validate email Field', () => {

    beforeEach(() => {
      email = component.addMonsterForm.get('email');
    });

    it('should accept legitimate value', () => {
      email.setValue('moo@cow.com');
      expect(email.valid).toBeTruthy();
      expect(email.errors).toBeNull();
    });

    it('should complain that field is required if empty', () => {
      email.setValue('');
      expect(email.valid).toBeFalsy();
      let errors = email.errors;
      expect(errors['required']).toBeTruthy();
    });

    it('should complain when supplied with an invalid value', () => {
      email.setValue('abc');
      expect(email.valid).toBeFalsy();
      let errors = email.errors;
      expect(errors['pattern']).toBeTruthy();
    });

  });

  describe('should validate userName Field', () => {

    beforeEach(() => {
      username = component.addMonsterForm.get('username');
    });

    it('should accept legitimate value', () => {
      username.setValue('abc123');
      expect(username.valid).toBeTruthy();
      expect(username.errors).toBeNull();
    });

    it('should complain that field is required if empty', () => {
      username.setValue('');
      expect(username.valid).toBeFalsy();
      let errors = username.errors;
      expect(errors['required']).toBeTruthy();
    });

    it('should complain when supplied with an invalid value', () => {
      username.setValue('abc@');
      expect(username.valid).toBeFalsy();
      let errors = username.errors;
      expect(errors['pattern']).toBeTruthy();
    });

  });

  describe('should accept catchline values', () => {

    beforeEach(() => {
      username = component.addMonsterForm.get('catchline');
    });

    it('should accept legitimate value', () => {
      username.setValue('something cheesy');
      expect(username.valid).toBeTruthy();
      expect(username.errors).toBeNull();
    });

    it('should not complain if field is empty', () => {
      username.setValue('');
      expect(username.valid).toBeTruthy();
      let errors = username.errors;
      expect(errors).toBeNull();
    });

  });

});


// =================================================================================
// shallow unit tests to check
// - save button is disabled when the form is in an invalid state
// - form submission works as expected in the absence/presence of server errors
// =================================================================================

describe('AddMonsterComponent - shallow tests', () => {

  let component: AddMonsterComponent;
  let fixture: ComponentFixture<AddMonsterComponent>;
  let monsterService: MonsterService;
  let mockRouter;

  beforeEach(async(() => {

    mockRouter = createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [AddMonsterComponent],
      providers: [MonsterService, {provide: Router, useValue: mockRouter}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([MonsterService],
    (monsterServiceIn) => {
      monsterService = monsterServiceIn;

    }));

  afterEach(() => {
    component.ngOnDestroy();
  });

  function enterValidInputs() {
    component.addMonsterForm.get('name.firstName').setValue('frank');
    component.addMonsterForm.get('name.lastName').setValue('instein');
    component.addMonsterForm.get('username').setValue('frankie');
    component.addMonsterForm.get('email').setValue('frankie@monster.com');
    component.addMonsterForm.get('imageFile').setValue('icon11.png');
    component.addMonsterForm.get('catchline').setValue('something cheesy');
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save button', () => {
    it('is disabled when the form is in an invalid state', async(() => {
      expect(component.addMonsterForm.valid).toBeFalsy();
      const button = fixture.nativeElement.querySelector('#addMonsterButton');
      expect(button.disabled).toBeTruthy();
    }));
    it('is enabled when the form is in a valid state', async(() => {
      expect(component.addMonsterForm.valid).toBeFalsy();
      const button = fixture.nativeElement.querySelector('#addMonsterButton');
      expect(button.disabled).toBeTruthy();

      // fill out form correctly
      enterValidInputs();

      // trigger changes
      fixture.detectChanges();

      fixture.whenStable().then(() => {
        expect(component.addMonsterForm.valid).toBeTruthy();

        // expect 'save' button to be enabled & then click on it
        const button = fixture.nativeElement.querySelector('#addMonsterButton');
        expect(button.disabled).toBeFalsy();
      });

    }));
  });

  describe('form submission', () => {
    it('should handle successful POST', async(() => {
      // set up mocks
      const obs = Observable.create(observer => {
        observer.next({message: 'success'});
      });
      const spyOnPostRequest = spyOn(monsterService, 'addMonster')
        .and.returnValue(obs);

      // fill out form correctly
      enterValidInputs();

      // trigger changes
      fixture.detectChanges();

      // wait until change detection has fired
      fixture.whenStable().then(() => {
        expect(component.addMonsterForm.valid).toBeTruthy();

        // expect 'save' button to be enabled & then click on it
        const button = fixture.nativeElement.querySelector('#addMonsterButton');
        expect(button.disabled).toBeFalsy();
        button.click();

        // trigger changes
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(button.disabled).toBeTruthy();  // form will be reset and consequently save button disabled
          expect(spyOnPostRequest).toHaveBeenCalled();
          expect(mockRouter.navigate).toHaveBeenCalledWith(['/view-monsters/'])
        });
      });
    }));
    it('should handle error response returned by server', async(() => {

      let errorResponse = {status: 500};

      expect(component.error).toBeFalsy();

      // set up mocks
      const err = Observable.throw(errorResponse);
      const spyOnPostRequest = spyOn(monsterService, 'addMonster')
        .and.returnValue(err);

      // fill out form correctly
      enterValidInputs();

      // trigger changes
      fixture.detectChanges();

      // wait until change detection has fired
      fixture.whenStable().then(() => {
        expect(component.addMonsterForm.valid).toBeTruthy();

        // expect 'save' button to be enabled & then click it
        const button = fixture.nativeElement.querySelector('#addMonsterButton');
        expect(button.disabled).toBeFalsy();
        button.click();

        // trigger changes
        fixture.detectChanges();

        fixture.whenStable().then(() => {
          expect(button.disabled).toBeFalsy();
          expect(spyOnPostRequest).toHaveBeenCalled();
          console.log('ERROR -> ', component.error);
          expect(component.error).toBeTruthy();
        });

      });
    }));
  });


});
