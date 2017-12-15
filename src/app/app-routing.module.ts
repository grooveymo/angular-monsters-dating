import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './layout/home/home.component';

// declare app routes (note should not have leading slash)
const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  // {path: 'create-contact', component: CreateContactComponent},
  // {path: 'view-contacts', component: ListContactsComponent},
  // {path : 'edit-contact/:id', component : EditContactComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  declarations: [],
  exports: [RouterModule] // Need this to ensure that routes get registered in the root module
})
export class AppRoutingModule { }
