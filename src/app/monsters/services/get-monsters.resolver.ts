import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {MonsterService} from './monster.service';

/**
 * Resolver for monstersService.getMonsters() which returns array of Monster instances
 */
@Injectable()
export class GetMonstersResolver implements Resolve<any> {
  constructor(private monstersService: MonsterService) {}

  resolve() {
    return this.monstersService.getMonsters();
  }
}
