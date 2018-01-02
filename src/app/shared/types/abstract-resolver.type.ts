import {HttpErrorResponse} from '@angular/common/http';

/**
 * Non HTTP response type errors
 */
class NonHttpResponseError extends Error {
  constructor(public originalError: any) {
    super();
  }
}

/**
 * Super class to define error handling methods
 */
export class AbstractResolver {
  constructor(){}

  protected wrapError(err: any): Error {
    if(err instanceof  HttpErrorResponse) {
      return err;
    }
    return new NonHttpResponseError(err);
  }

}
