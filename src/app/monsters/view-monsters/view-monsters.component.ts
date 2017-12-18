import {Component, OnDestroy, OnInit} from '@angular/core';
import {MonsterService} from '../services/monster.service';
import {Monster} from '../models/monster.model';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-monsters',
  templateUrl: './view-monsters.component.html',
  styleUrls: ['./view-monsters.component.css']
})
export class ViewMonstersComponent implements OnInit, OnDestroy {

  monsters: Monster[] = [];
  subscription: Subscription;


  constructor(private router: Router, private monsterService: MonsterService) {
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
    this.router.navigate(['/edit-monster/', id]);
  }

  // removeMonster(id: string): void {
  //   console.log('removing: ', id);
  //   this.monsterService.removeMonster(id).subscribe(response => {
  //     console.log('monsters retrieved => ', response);
  //   });
  // }

  removeMonster($event): void {
    console.log('[parent] removeMonster: id = ', $event);

    console.log('removing: ', $event);
    let id = $event;
    this.monsterService.removeMonster(id).subscribe(response => {
      console.log('monsters retrieved => ', response);
      this.router.navigate(['/view-monsters/'));
    });
  }

}
