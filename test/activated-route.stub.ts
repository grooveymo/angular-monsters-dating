/**
 * Stub for ActivatedRouter
 * mocks out ActivatedRoute.snapshot.params
 */
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class ActivatedRouteStub {

  /**
   *
   * @param resolvedData data to be wrapped in Observable and returned as part of route.data.subscribe()
   */
  constructor(public resolvedData: any) {}

  get snapshot() {
    return {
      paramMap: {
        get() {
          return null;
        }
      },
      data: this.resolvedData
    };
  }

  /**
   * Returns data passed in via constructor
   * @return {Observable<any>} data returned when client performs route.data.subscribe()
   */
  get data() {
    return Observable.of(this.resolvedData);
  }

}
