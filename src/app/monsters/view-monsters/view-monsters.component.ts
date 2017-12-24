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

  constructor(private router: Router, private monsterService: MonsterService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    let resolvedValue = this.route.snapshot.data.monstersData;
    if (resolvedValue.hasError()) {
      console.log('Error retrieving data', resolvedValue.error);
    } else {
      this.monsters = resolvedValue.data;
      console.log('monsters retrieved => ', this.monsters);
    }
  }

  ngOnDestroy() {
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
        console.log('backend returns response => ', response);
      this.router.navigate(['/home']);
      },
      err => {
        debugger;
        console.log('err =>? ', err);
      });
  }

}
