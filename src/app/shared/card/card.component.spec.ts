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
    'marshie', 'icon01.png');

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

  it('should display monster username', () => {
    const usernameElement = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(usernameElement.textContent).toBe(monster.username);
  });

  it('should display monster full name (capitalized)', () => {
    const listElement = fixture.debugElement.queryAll(By.css('.list-group-item'));
    const nameElement = listElement[0].nativeElement;
    expect( nameElement.textContent).toBe('Marsh Mellowman');
  });

  it('should display monster email', () => {
    const listElement = fixture.debugElement.queryAll(By.css('.list-group-item'));
    const emailElement = listElement[1].nativeElement;
    expect(emailElement.textContent).toBe(monster.email);
  });

});
