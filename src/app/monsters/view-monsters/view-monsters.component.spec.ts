import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMonstersComponent } from './view-monsters.component';

describe('ViewMonstersComponent', () => {
  let component: ViewMonstersComponent;
  let fixture: ComponentFixture<ViewMonstersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMonstersComponent ]
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
  });
});
