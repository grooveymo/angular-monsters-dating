import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMonsterComponent } from './add-monster/add-monster.component';
import { ViewMonstersComponent } from './view-monsters/view-monsters.component';
import { EditMonsterComponent } from './edit-monster/edit-monster.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MonsterService} from './services/monster.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [AddMonsterComponent, ViewMonstersComponent, EditMonsterComponent],
  providers: [MonsterService]

})
export class MonstersModule { }
