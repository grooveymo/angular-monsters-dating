/**
 * Return this from any 'resolve' function. It allows us to set either data/error based on the outcome
 * of the actual back end call.
 */
// export interface ResolvedValue<T> {
//   data?: T;
export class ResolvedValue<T> {
  // data?: T
  // error?: any;

  public data?: T
  public error?: any;

  constructor(dataIn: T, errorIn: Error = null) {
    this.data = dataIn;
    this.error = errorIn;
  }

  hasError(): boolean {
    return this.error !== null;
  }
}
