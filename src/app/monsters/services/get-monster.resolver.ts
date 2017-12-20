import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {MonsterService} from './monster.service';
import {ResolvedValue} from '../../shared/types/resolved-value.type';
import {Monster} from '../models/monster.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {AbstractResolver} from '../../shared/types/abstract-resolver.type';

/**
 * Resolver for monstersService.getMonster() which returns single Monster instance
 */
@Injectable()
export class GetMonsterResolver extends AbstractResolver implements Resolve<any> {

  constructor(private monstersService: MonsterService) {
    super();
  }

   resolve(route: ActivatedRouteSnapshot): Observable<{} | ResolvedValue<Monster>> {
    return this.monstersService.getMonster(route.paramMap.get('id'))
      .map(result => new ResolvedValue(result))
      .catch(err => {
        return Observable.of(new ResolvedValue(null, this.wrapError(err)))
      });
  }
}
