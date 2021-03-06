 /* istanbul ignore next */
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

  get snapshot() {
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
  get data() {
    return Observable.of(this.resolvedData);
  }

}

