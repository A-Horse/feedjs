import * as Rx from 'rxjs';
import md5 from 'md5'
import fetch from 'isomorphic-fetch';

const loop = (sources) => {
  const hashMap = new Map();
  return Rx.Observable.of(...sources)
    .mergeMap(async (source) => {
      const feedRawData = await (await fetch(source.url)).text();
      return { ...source, feedRawData };
    })
    .filter(feed => {
      const hash = md5(feed.feedRawData);
      if (hashMap[feed.url] === hash) {
        return false;
      }
      hashMap[feed.url] = hash;
      return true;
    })
    .delay(10000)
    .repeat();
}

export default loop;
