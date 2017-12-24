import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMonsterComponent } from './add-monster/add-monster.component';
import { ViewMonstersComponent } from './view-monsters/view-monsters.component';
import { EditMonsterComponent } from './edit-monster/edit-monster.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MonsterService} from './services/monster.service';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../shared/shared.module';
import {GetMonstersResolver} from './services/get-monsters.resolver';
import {GetMonsterResolver} from './services/get-monster.resolver';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule
  ],
  declarations: [AddMonsterComponent, ViewMonstersComponent, EditMonsterComponent],
  providers: [MonsterService, GetMonsterResolver, GetMonstersResolver]

})
export class MonstersModule { }
