/**
 * Stub for ActivatedRouter
 * mocks out ActivatedRoute.snapshot.params
 */
import {Observable} from 'rxjs/Observable';

export class ActivatedRouteStub {

  /**
   *
   * @param resolvedData data to be wrapped in Observable and returned as part of route.data.subscribe()
   */
  constructor(public resolvedData: any) {}

  snapshot() {
    return {
      paramMap: {
        get() {
          return 'abc123';
        }
      },
      data: this.resolvedData
    }
  }

  /**
   * Returns data passed in via constructor
   * @return {Observable<any>} data returned when client performs route.data.subscribe()
   */
  data() {
    return Observable.of(this.resolvedData);
  }

}