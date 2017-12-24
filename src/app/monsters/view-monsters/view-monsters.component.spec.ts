import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMonstersComponent } from './view-monsters.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MonsterService} from '../services/monster.service';
import {HttpClientModule} from '@angular/common/http';
import {Monster} from '../models/monster.model';

describe('ViewMonstersComponent', () => {
  let component: ViewMonstersComponent;
  let fixture: ComponentFixture<ViewMonstersComponent>;
  const monster = new Monster('firstName', 'lastName', 'first@lastname.com', 'username', 'icon01.png');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientModule],
      declarations: [ ViewMonstersComponent ],
      providers: [MonsterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMonstersComponent);
    component = fixture.componentInstance;
    component.monsters = [monster];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
