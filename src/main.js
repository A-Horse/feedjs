import loop from './loop';
import md5 from 'md5';
import xml2js from 'xml2js';
import { parseFeed } from 'feed-parse-lib';

// process.on('unhandledRejection', function(err) {
//   console.error(err);
// });

export const startFetchFeed = (feeds, listenFn) => {
  const feedObservable = loop(feeds);
  feedObservable.subscribe(async feed => {
    try {
      if (!feed) {
        return;
      }
      const parsedFeed = await parseFeed(feed.feedRawData);
      return listenFn(null, parsedFeed);
    } catch (error) {
      return listenFn(error);
    }
  });
  return () => subscription.unsubscribe(); // TODO: next complete
};

export default startFetchFeed;
