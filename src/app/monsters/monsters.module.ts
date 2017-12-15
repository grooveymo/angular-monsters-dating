import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMonsterComponent } from './add-monster/add-monster.component';
import { ViewMonstersComponent } from './view-monsters/view-monsters.component';
import { EditMonsterComponent } from './edit-monster/edit-monster.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AddMonsterComponent, ViewMonstersComponent, EditMonsterComponent]
})
export class MonstersModule { }
