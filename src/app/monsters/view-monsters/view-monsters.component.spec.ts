import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMonstersComponent } from './view-monsters.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {MonsterService} from '../services/monster.service';
import {HttpClientModule} from '@angular/common/http';
import {Monster} from '../models/monster.model';
import {ActivatedRouteStub} from '../../../../test/activated-route.stub';
import {ResolvedValue} from '../../shared/types/resolved-value.type';
import {ActivatedRoute} from '@angular/router';

describe('ViewMonstersComponent', () => {
  let component: ViewMonstersComponent;
  let fixture: ComponentFixture<ViewMonstersComponent>;
  const monster = new Monster('firstName', 'lastName', 'first@lastname.com', 'username', 'icon01.png');

  // declare mock for successful data retrieval, i.e. sunny day scenario
  const resolvedValue = new ResolvedValue([monster]);
  const dataResponse = {monstersData: resolvedValue};
  const activatedRouteStubWithSuccess = new ActivatedRouteStub(dataResponse);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule, HttpClientModule],
      declarations: [ ViewMonstersComponent ],
      providers: [MonsterService,
        {provide: ActivatedRoute, useValue: activatedRouteStubWithSuccess}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMonstersComponent);
    component = fixture.componentInstance;
    component.monsters = [monster];
    fixture.detectChanges();
  });

  // TODO: fix
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
