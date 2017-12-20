import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {MonsterService} from './monster.service';
import {AbstractResolver} from '../../shared/types/abstract-resolver.type';
import {Monster} from '../models/monster.model';
import {ResolvedValue} from '../../shared/types/resolved-value.type';
import {Observable} from 'rxjs/Observable';

/**
 * Resolver for monstersService.getMonsters() which returns array of Monster instances
 */
@Injectable()
export class GetMonstersResolver  extends AbstractResolver  implements Resolve<any> {
  constructor(private monstersService: MonsterService) {
    super();
  }

  resolve(): Observable<{} | ResolvedValue<Monster[]>> {
    return this.monstersService.getMonsters()
      .map(result => new ResolvedValue(result))
      .catch(err => {
        return Observable.of(new ResolvedValue(null, this.wrapError(err)))
      });

  }
}
