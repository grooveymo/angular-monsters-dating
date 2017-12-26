import {AddMonsterComponent} from './add-monster.component';
import {MonsterService} from '../services/monster.service';
import {Router} from '@angular/router';
import createSpyObj = jasmine.createSpyObj;

// describe('AddMonsterComponent', () => {
//   let component: AddMonsterComponent;
//   let fixture: ComponentFixture<AddMonsterComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
//       declarations: [AddMonsterComponent],
//       providers: [MonsterService]
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AddMonsterComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//
//
// });

// ================================================
fdescribe('AddMonsterComponent - isolated tests', () => {

  let component: AddMonsterComponent;
  let firstName;
  let lastName;
  let email;
  let username;


  beforeEach(() => {
    let mockMonsterService = createSpyObj('MonsterService',['addMonster']);
    let mockRouter = createSpyObj('Router',['navigate']);
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

});
