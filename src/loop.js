import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import md5 from 'md5';
import fetch from 'isomorphic-fetch';

const loop = sources => {
  const hashMap = new Map();
  return Observable.interval(60000).mergeMap(() =>
    Observable.of(...sources)
      .concatMap(async source => {
        const feedRawData = await (await fetch(source.url)).text();
        return { ...source, feedRawData };
      }).filter(feed => {
        const hash = md5(feed.feedRawData);
        if (hashMap[feed.url] === hash) {
          return false;
        }
        hashMap[feed.url] = hash;
        return true;
      }).catch(error => {
        console.error(`fetch failure : ${error.message}`); // TODO 如何向外抛出错误
        return Observable.of(null);
      })
  );
};

export default loop;
