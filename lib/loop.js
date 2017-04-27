import * as Rx from 'rxjs';
import fetch from 'isomorphic-fetch';

const loop = (sources) =>
  Rx.Observable.of(...sources)
    .mergeMap(source => fetch(source).then(resp => resp.text()))
    .delay(10000)
    .repeat();

export default loop;
