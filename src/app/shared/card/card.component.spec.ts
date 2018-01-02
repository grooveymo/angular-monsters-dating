import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CardComponent} from './card.component';
import {CapitalizeNamePipe} from '../pipes/capitalize-name.pipe';
import {RouterTestingModule} from '@angular/router/testing';
import {Monster} from '../../monsters/models/monster.model';
import {By} from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const monster = new Monster('marsh', 'mellowman', 'marshmellowman@ghostbusters.com',
    'marshie', 'icon01.png', 'Cheesy feet smell great, and I have the greatest feet'
    , 'abc123');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CardComponent, CapitalizeNamePipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.data = monster;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return fullName', () => {
    expect(component.getFullName()).toBe('marsh mellowman');
  });

  it('should display monster username', () => {
    const usernameElement = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(usernameElement.textContent).toBe(monster.username);
  });

  it('should display monster full name (capitalized)', () => {
    const listElement = fixture.debugElement.queryAll(By.css('.list-group-item'));
    const nameElement = listElement[0].nativeElement;
    expect(nameElement.textContent).toBe('Marsh Mellowman');
  });

  it('should display monster email', () => {
    const listElement = fixture.debugElement.queryAll(By.css('.list-group-item'));
    const emailElement = listElement[1].nativeElement;
    expect(emailElement.textContent).toBe(monster.email);
  });

  it('should display catchline', () => {
    const listElement = fixture.debugElement.queryAll(By.css('.list-group-item'));
    const catchlineElement = listElement[2].nativeElement;
    expect(catchlineElement.textContent).toBe(monster.catchline);
  });

  it('should handle @Input', () => {
    const newMonster = new Monster('alfie', 'beteater', 'alfie@ghostbusters.com',
      'alfie', 'icon02.png', 'another catchline', 'def456');

    component.data = newMonster;
    fixture.detectChanges();

    const usernameElement = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(usernameElement.textContent).toBe(newMonster.username);

    const listElement = fixture.debugElement.queryAll(By.css('.list-group-item'));

    const nameElement = listElement[0].nativeElement;
    expect(nameElement.textContent).toBe('Alfie Beteater');
    const emailElement = listElement[1].nativeElement;
    expect(emailElement.textContent).toBe(newMonster.email);
    const catchlineElement = listElement[2].nativeElement;
    expect(catchlineElement.textContent).toBe(newMonster.catchline);

  });

  describe('should handle @Output', () => {

    it('should emit edit event', () => {

      // subscribe to the emitted event
      component.emitEditMonster.subscribe((value) => {
        expect(value).toBe('abc123');
      });

      // trigger event emission by clicking on button
      const editButton = fixture.nativeElement.querySelector('button.btn-primary');
      editButton.click();

    });

    it('should emit remove event', () => {

      // subscribe to the emitted event
      component.emitRemoveMonster.subscribe((value) => {
        expect(value).toBe('abc123');
      });

      // trigger event emission by clicking on button
      const removeButton = fixture.nativeElement.querySelector('button.btn-danger');
      removeButton.click();

    });


  });


});



