import loop from './lib/loop';
import md5 from 'md5'
import xml2js from 'xml2js';

export const startListenFeed = () => {
  // const hash
  const subscription = loop(
    [{url: "http://nullprogram.com/feed/"}, {url: "https://www.raspberrypi.org/feed/"}]
  ).subscribe(async (feedRawData) => {
    const feedXml = await xml2js.parseString(feedRawData);
    console.log('md5', md5(feedRawData));
    // console.log(
    //   '-------'
    // );
    // console.log(
    //   feedXml
    // );
  });
  return () => subscription.unsubscribe();
};

startListenFeed();
