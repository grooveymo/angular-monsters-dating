import {Router, Routes} from '@angular/router';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  template: `<div>Home</div>`
})
export class HomeComponentStub {
}

@Component({
  template: `<div>AddMonster</div>`
})
export class AddMonsterComponentStub {
}
@Component({
  template: `<div>EditMonster</div>`
})
export class EditMonsterComponentStub {
}
@Component({
  template: `<div>ViewMonster</div>`
})
export class ViewMonstersComponentStub {
}
@Component({
  template: `<div>PageNotFound</div>`
})
export class PageNotFoundComponentStub {
}

@Component({
  template: `<router-outlet></router-outlet>`
})
export class AppComponentStub {
}

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponentStub},
  {path: 'add-monster', component: AddMonsterComponentStub},
  {path: 'view-monsters', component: ViewMonstersComponentStub},
  {path : 'edit-monster/:id', component : EditMonsterComponentStub},
  {path: '404', component: PageNotFoundComponentStub},
  {path: '**', redirectTo: '/404'}
];

describe('App Routing tests ', () => {

  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes)],
      declarations: [
        HomeComponentStub,
        AddMonsterComponentStub,
        ViewMonstersComponentStub,
        EditMonsterComponentStub,
        PageNotFoundComponentStub,
        AppComponentStub
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponentStub);

  });

  it('navigate to "" takes you to /home', () => {
    expect(location.path()).toBe('');
    testNavigation('', '/home');
  });

  it('navigate to "home" takes you to /home', () => {
    expect(location.path()).toBe('');
    testNavigation('home', '/home');
  });

  it('navigate to "add-monster" takes you to /add-monster', () => {
    expect(location.path()).toBe('');
    testNavigation('add-monster', '/add-monster');
  });

  it('navigate to "view-monsters" takes you to /view-monsters', () => {
    expect(location.path()).toBe('');
    testNavigation('view-monsters', '/view-monsters');
  });

  it('navigate to "edit-monster/abc123" takes you to /edit-monster', () => {
    expect(location.path()).toBe('');
    testNavigation('edit-monster/abc123', '/edit-monster/abc123');
  });

  it('navigate to non-existant route takes you to /404', () => {
    expect(location.path()).toBe('');
    testNavigation('madeup-route', '/404');
  });


  /**
   * utility function to check that router navigates to the expected path
   * @param {string} toPath where we're navigating to
   * @param {string} endPath where we end up
   */
  function testNavigation(toPath: string, endPath: string) {

    router.navigate([toPath]).then(
      success => {
        expect(location.path()).toBe(endPath);
      },
      fail => {
        fail(`Could not navigate to ${toPath} page`);
      }
    );

  }
});
