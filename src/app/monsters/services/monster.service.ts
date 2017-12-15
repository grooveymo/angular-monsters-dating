import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Monster} from './monster.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const MONSTERS_REST_API = 'http://localhost:9090/api/monsters';

@Injectable()
export class MonsterService {

  constructor(private http: HttpClient) { }


  /**
   * Creates a new Monster entry in the database
   * @param body Monster details
   * @returns {Observable<Monster>}
   */
  addMonster(body: Monster): Observable<Monster> {

    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    console.log('inside service with body : ' + JSON.stringify(body));
    return this.http
      .post<Monster>(MONSTERS_REST_API, body, {headers: headers})
      // // .map((response: Response) => {
      // //   const persistedMonster = response.monster;
      // //   console.log('1.) service responds with ' + JSON.stringify(response));
      // //   console.log('2.) service responds with ' + JSON.stringify(persistedMonster));
      // //   return persistedMonster;
      // // })
      // .catch((error: any) => Observable.throw(error.json().error || 'Server error')
      // );

  }

}
