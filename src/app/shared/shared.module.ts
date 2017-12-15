import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CapitalizeNamePipe } from './pipes/capitalize-name.pipe';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [CardComponent, CapitalizeNamePipe],
  exports: [CardComponent]

})
export class SharedModule { }
