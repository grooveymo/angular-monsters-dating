import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddMonsterComponent} from './monsters/add-monster/add-monster.component';
import {ViewMonstersComponent} from './monsters/view-monsters/view-monsters.component';
import {EditMonsterComponent} from './monsters/edit-monster/edit-monster.component';
import {GetMonstersResolver} from './monsters/services/get-monsters.resolver';
import {GetMonsterResolver} from './monsters/services/get-monster.resolver';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'add-monster', component: AddMonsterComponent},
  {path: 'view-monsters', component: ViewMonstersComponent, resolve: { monstersData: GetMonstersResolver }},
  {path : 'edit-monster/:id', component : EditMonsterComponent, resolve: { monsterData: GetMonsterResolver }},

  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes , /*{enableTracing: true}*/ )
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
