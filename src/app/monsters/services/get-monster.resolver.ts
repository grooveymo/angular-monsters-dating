import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {MonsterService} from './monster.service';
import {ResolvedValue} from '../../shared/types/resolved-value';
import {Monster} from '../models/monster.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {HttpErrorResponse} from '@angular/common/http';

class UnclassifiedError extends Error {
  constructor(public originalError: any) {
    super();
  }
}

function wrapError(err: any): Error {
  if(err instanceof  HttpErrorResponse) {
    return err;
  }
  return new UnclassifiedError(err);
}
/**
 * Resolver for monstersService.getMonster() which returns single Monster instance
 */
@Injectable()
// export class GetMonsterResolver implements Resolve<ResolvedValue<Monster>> {
export class GetMonsterResolver implements Resolve<any> {

  constructor(private monstersService: MonsterService) {}

   resolve(route: ActivatedRouteSnapshot): Observable<{} | ResolvedValue<Monster>> {
    return this.monstersService.getMonster(route.paramMap.get('id'))
      .map(result => new ResolvedValue(result))
      .catch(err => {
        return Observable.of(new ResolvedValue(null, wrapError(err)))
      });
  }
}
