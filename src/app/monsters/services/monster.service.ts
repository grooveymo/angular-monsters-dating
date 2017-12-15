import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Monster} from '../models/monster.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const MONSTERS_REST_API = 'http://localhost:9090/api/monsters';

@Injectable()
export class MonsterService {

  constructor(private http: HttpClient) {
  }


  /**
   * Creates a new Monster entry in the database
   * @param body Monster details
   * @returns {Observable<Monster>}
   */
  addMonster(body: Monster): Observable<Monster> {

    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    console.log('inside service with body : ' + JSON.stringify(body));
    return this.http
      .post<Monster>(MONSTERS_REST_API, body, {headers: headers});

  }


  /**
   * Returns list of All Monsters
   * @return {Observable<Monster[]>}
   */
  getMonsters(): Observable<Monster[]> {
    return this.http
      .get(MONSTERS_REST_API)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  /**
   * Retrieves specific Monster
   * @param {string} _id monster id
   * @return {Monster} Instance of Monster
   */
  getMonster(_id: string): Observable<Monster> {
    console.log(' looking for _id: ', _id);
    return this.http
      .get(MONSTERS_REST_API + '/' + _id)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  /**
   * Updates entry in db for current monster
   * @param {Monster} monster
   * @return {Observable<any | any>}
   */
  updateMonster(monster: Monster) {

    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    const path = MONSTERS_REST_API + '/' + monster._id;

    console.log('inside service with body : ' + JSON.stringify(monster));
    return this.http
      .put(path, monster,{headers: headers})
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')
      );

  }


  /**
   * Removes entry from monster database
   * @param {string} monsterId
   * @return {Observable<any | any>}
   */
  removeContact(monsterId: string) {
    const path = MONSTERS_REST_API + '/' + monsterId;
    return this.http.delete(path)
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

}
