import { Feed } from 'feed';
import { Blog } from '../models/blog';

const FetchFeed = require('./fetchFeed');

module.exports = (router) => {

  function fetchFeedRss(res) {
    FetchFeed( (err, feed) => {
      if (err) {
        return res.json({success: false, message: err});
      }
      res.type('rss');
      res.send(feed.rss2());
    });
  }

  router.get('/atom', (req, res) => {
    FetchFeed( (err, feed) => {
      if (err) {
        return res.json({success: false, message: err});
      }
      res.type('atom');
      res.send(feed.atom1());
    });
  });

  router.get('/rss', (req, res) => {
    fetchFeedRss(res);
  });

  router.get('/json', (req, res) => {
    FetchFeed( (err, feed) => {
      if (err) {
        return res.json({success: false, message: err});
      }
      res.type('json');
      res.send(feed.json1());
    });
  });

  router.get('/*', (req, res) => {
    fetchFeedRss(res);
  });

  return router;
}
