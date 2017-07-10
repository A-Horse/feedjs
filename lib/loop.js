import * as Rx from 'rxjs';
import { Observable } from 'rxjs';
import md5 from 'md5';
import fetch from 'isomorphic-fetch';

const loop = sources => {
  const hashMap = new Map();
  return Observable.interval(1000).mergeMap(() => {
    return Observable.of(...sources)
      .concatMap(async source => {
        const feedRawData = await (await fetch(source.url)).text();
        return { ...source, feedRawData };
      })
      .filter(feed => {
        console.log('feed');
        const hash = md5(feed.feedRawData);
        if (hashMap[feed.url] === hash) {
          return false;
        }
        hashMap[feed.url] = hash;
        return true;
      });
  });
};

export default loop;
