import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {LayoutModule} from './layout/layout.module';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {MonstersModule} from './monsters/monsters.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    LayoutModule,
    AppRoutingModule,
    MonstersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
