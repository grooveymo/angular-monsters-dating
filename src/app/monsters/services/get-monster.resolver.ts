import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {MonsterService} from './monster.service';

/**
 * Resolver for monstersService.getMonster() which returns single Monster instance
 */
@Injectable()
export class GetMonsterResolver implements Resolve<any> {
  constructor(private monstersService: MonsterService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.monstersService.getMonster(route.paramMap.get('id'));
  }
}
