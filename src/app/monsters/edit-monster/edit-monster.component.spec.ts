import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { EditMonsterComponent } from './edit-monster.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MonsterService} from '../services/monster.service';
import {Monster} from '../models/monster.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ActivatedRouteStub} from '../../../../test/activated-route.stub';
import {ResolvedValue} from '../../shared/types/resolved-value.type';
import {AddMonsterComponent} from '../add-monster/add-monster.component';
import {Observable} from 'rxjs/Observable';
import createSpyObj = jasmine.createSpyObj;

/**
 * I've not implemented many tests aside from the basic 'should create', because the form component here is identical to
 * the one presented on the AddMonsters page which provides more rigorous testing. Both AddMonster and EditMonster pages
 * could be refactored to use a common component.
 */
describe('EditMonsterComponent', () => {
  let component: EditMonsterComponent;
  let fixture: ComponentFixture<EditMonsterComponent>;
  const monster = new Monster('firstName', 'lastName', 'first@lastname.com', 'username', 'icon01.png');

  // declare mock for successful data retrieval, i.e. sunny day scenario
  const resolvedValue = new ResolvedValue(monster);
  const dataResponse = {monsterData: resolvedValue};
  const activatedRouteStubWithSuccess = new ActivatedRouteStub(dataResponse);

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
    expect(component.fetchError).toBeFalsy();
  });
});


