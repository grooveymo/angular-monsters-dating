import {Component, OnDestroy, OnInit} from '@angular/core';
import {MonsterService} from '../services/monster.service';
import {Monster} from '../models/monster.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-view-monsters',
  templateUrl: './view-monsters.component.html',
  styleUrls: ['./view-monsters.component.css']
})
export class ViewMonstersComponent implements OnInit, OnDestroy {

  monsters: Monster[] = [];
  subscription: Subscription;


  constructor(private monsterService: MonsterService) {
  }

  ngOnInit() {
    this.subscription = this.monsterService.getMonsters().subscribe(data => {
      this.monsters = data
      console.log('monsters retrieved => ', this.monsters);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  editMonster(id: string): void {
    console.log('editing: ', id);
  }

  removeMonster(id: string): void {
    console.log('removing: ', id);
  }

}
