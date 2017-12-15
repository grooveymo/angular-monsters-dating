import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { CapitalizeNamePipe } from './pipes/capitalize-name.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CardComponent, CapitalizeNamePipe],
  exports: [CardComponent]

})
export class SharedModule { }
