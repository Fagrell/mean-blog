import { Feed } from 'feed';
const Blog = require('../models/blog');

const site: string = "https://www.cleanqt.io";

module.exports = (callback) => {
  Blog.find({}, {}, (err, blogs) => {

    if (err) {
      return callback('Could not get blogs. Error ' + err, null);
    }

    if (!blogs) {
      return callback('No blogs have been created.', null);
    }

    const feed = new Feed({
      title: "Clean Qt",
      description: "Exploring how to write clean Qt and C++ code",
      id: site,
      link: site,
      favicon: site + "/favicon.ico",
      image: site + "/assets/images/clean-qt-logo-xs.png",
      copyright: "All rights reserved 2018-2019",
      generator: "Clean Qt Feed",
      feedLinks: {
        json: site + "/feed/json",
        atom: site + "/feed/atom",
        rss2: site + "/feed/rss"
      },
      author: {
        name: "Alexander Fagrell"
      },
      feed: "",
    });

    blogs.forEach(post => {
      feed.addItem({
        title: post.title,
        id: site + "/blog/" + post.searchTitle,
        link: site + "/blog/" + post.searchTitle,
        description: post.summary,
        author: [
          {
            name: post.createdBy
          }
        ],
        date: post.createdAt
      });
    });
    
    return callback('', feed)

  }).sort({ '_id': -1 }).limit(10);
};
