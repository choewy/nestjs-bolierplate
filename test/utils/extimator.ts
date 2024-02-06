import { DateTime } from 'luxon';

export class Estimator {
  static fn<D>(fn: () => D) {
    const s = DateTime.local();
    const returnValue = fn();
    const e = DateTime.local();

    return {
      returnValue,
      milliseconds: e.diff(s, 'milliseconds').get('milliseconds'),
    };
  }

  static async promise<D>(fn: () => Promise<D>) {
    const s = DateTime.local();
    const returnValue = await fn();
    const e = DateTime.local();

    return {
      returnValue,
      milliseconds: e.diff(s, 'milliseconds').get('milliseconds'),
    };
  }
}
