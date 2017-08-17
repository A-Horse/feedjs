import loop from './lib/loop';
import md5 from 'md5';
import xml2js from 'xml2js';
import { parseFeed } from 'feed-parse-lib';
import colors from 'colors';

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
      return listenFn(parsedFeed);
    } catch (error) {
      console.log(colors.bold.red('Something wrong when parseFeed'));
      console.log(colors.bold.red(feed.url));
      console.log(colors.bold.red(error));
    }
  });
  return () => subscription.unsubscribe(); // TODO next complete
};

export default startFetchFeed;
