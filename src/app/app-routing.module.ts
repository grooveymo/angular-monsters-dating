import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './layout/home/home.component';
import {AddMonsterComponent} from './monsters/add-monster/add-monster.component';
import {ViewMonstersComponent} from './monsters/view-monsters/view-monsters.component';
import {EditMonsterComponent} from './monsters/edit-monster/edit-monster.component';
import {GetMonstersResolver} from './monsters/services/get-monsters.resolver';
import {GetMonsterResolver} from './monsters/services/get-monster.resolver';

// declare app routes (note should not have leading slash)
const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'add-monster', component: AddMonsterComponent},
  {path: 'view-monsters', component: ViewMonstersComponent, resolve: { monstersData: GetMonstersResolver }},
  {path : 'edit-monster/:id', component : EditMonsterComponent, resolve: { monsterData: GetMonsterResolver }}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes , {enableTracing: true} )
  ],
  declarations: [],
  exports: [RouterModule] // Need this to ensure that routes get registered in the root module
})
export class AppRoutingModule { }
