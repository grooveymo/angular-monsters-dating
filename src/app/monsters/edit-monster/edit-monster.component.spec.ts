import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMonsterComponent } from './edit-monster.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MonsterService} from '../services/monster.service';
import {Monster} from '../models/monster.model';
import {ActivatedRoute} from '@angular/router';
import {ActivatedRouteStub} from '../../../../test/activated-route.stub';
import {ResolvedValue} from '../../shared/types/resolved-value.type';

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
    component.monster = monster;
    fixture.detectChanges();
  });

  // TODO: fix
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
