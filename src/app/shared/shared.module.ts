import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CapitalizeNamePipe } from './pipes/capitalize-name.pipe';
import {RouterModule} from '@angular/router';
import { ExpanderDirective } from './directives/expander.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [CardComponent, CapitalizeNamePipe, ExpanderDirective],
  exports: [CardComponent]

})
export class SharedModule { }
