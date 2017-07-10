import loop from './lib/loop';
import md5 from 'md5';
import xml2js from 'xml2js';
import { parseFeed } from 'feed-parse-lib';

// process.on('unhandledRejection', function(err) {
//   console.error(err);
// });

export const startListenFeed = () => {
  // const hash
  const hash = {};
  const subscription = loop([
    { url: 'http://nullprogram.com/feed/' },
    { url: 'https://www.raspberrypi.org/feed/' }
  ]).subscribe(async feed => {
    console.log(feed.url);
    // try {
    //   const parsedFeed = await parseFeed(feed.feedRawData);
    // } catch (error) {
    //   console.error(error);
    // }
  });
  return () => subscription.unsubscribe();
};

startListenFeed();
