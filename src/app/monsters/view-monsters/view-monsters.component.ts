import {Component, OnDestroy, OnInit} from '@angular/core';
import {MonsterService} from '../services/monster.service';
import {Monster} from '../models/monster.model';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-view-monsters',
  templateUrl: './view-monsters.component.html',
  styleUrls: ['./view-monsters.component.css']
})
export class ViewMonstersComponent implements OnInit, OnDestroy {

  monsters: Monster[] = [];
  fetchError = false;

  removeMonsterSubscription: Subscription;

  constructor(private router: Router, private monsterService: MonsterService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let resolvedValue = this.route.snapshot.data.monstersData;
    if (resolvedValue.hasError()) {
      this.fetchError = true;
    } else {
      this.monsters = resolvedValue.data;
    }
  }

  ngOnDestroy() {
    if(this.removeMonsterSubscription) {
      this.removeMonsterSubscription.unsubscribe();
    }
  }

  editMonster($event): void {
    this.router.navigate(['/edit-monster/', $event]);
  }

  removeMonster($event): void {
    let id = $event;
    this.removeMonsterSubscription = this.monsterService.removeMonster(id).subscribe(response => {
      this.router.navigate(['/home']);
      },
      err => {
        console.log('err =>? ', err);
      });
  }

}
