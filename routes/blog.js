const User = require('../models/user');
const Blog = require('../models/blog');
const config = require('../config/database');
const checkAuth = require('./checkAuth');

module.exports = (router) => {
  router.post('/new', (req, res) => {
    checkAuth(req.headers['auth'], (err, decoded) => {
      if (err) {
        return res.json({success: false, message: err});
      }

      if (!req.body.title) {
        return res.json({ success: false, message: 'You need to provide a title'});
      }

      if (!req.body.summary) {
        return res.json({ success: false, message: 'You need to provide a summary'});
      }

      if (!req.body.body) {
        return res.json({ success: false, message: 'You need to provide a body'});
      }

      if (!req.body.createdBy) {
        return res.json({ success: false, message: 'You need to provide a user object id'});
      }

      if (!req.body.tags) {
        return res.json({ success: false, message: 'You need to provide at least one tag'});
      }

      if (typeof req.body.public === "undefined") {
        return res.json({ success: false, message: 'You need to specify if the blog post should be public'});
      }

      let searchTitle = req.body.title.split(' ').join('-');

      let blog = new Blog({
        title: req.body.title,
        searchTitle: searchTitle,
        summary: req.body.summary,
        body: req.body.body,
        createdBy: req.body.createdBy,
        tags: req.body.tags,
        public: req.body.public
      });

      blog.save((err) => {
        if (err) {
          if (err.errors) {
            if (err.errors.title) {
              return res.json({ success: false, message: err.errors.title.message});
            }

            if (err.errors.summary) {
              return res.json({ success: false, message: err.errors.summary.message});
            }

            if (err.errors.body) {
              return res.json({ success: false, message: err.errors.body.message});
            }

            return res.json({ success: false, message: 'Could not save blog. Error ' + err});
          }
          
          return res.json({ success: false, message: 'Could not save blog. Error ' + err});
          
        }
        return res.json({ success: true, message: 'Blog registered!'});
      });
    });
  });

  router.get('/all', (req, res) => {
    Blog.find({}, { body: 0, searchTitle: 0 }, (err, blogs) => {

      if (err) {
        return res.json({ success: false, message: 'Could not get blogs. Error ' + err});
      }

      if (!blogs) {
        return res.json({ success: false, message: 'No blogs have been created.'});
      }

      return res.json({ success: true, blogs: blogs});
    }).sort({ '_id': -1 });
  });

  router.get('/one/:title', (req, res) => {

    Blog.findOne({"searchTitle": req.params.title.toLowerCase()}, { searchTitle: 0 }, (err, blog) => {

      if (err) {
        return res.json({ success: false, message: 'Could not find blog. Error ' + err});
      }

      if (!blog) {
        return res.json({ success: false, message: 'No blogs have been created.'});
      }

      return res.json({ success: true, blog: blog});
    });
  });

  router.get('/few', (req, res) => {

    if (!req.query.amount) {
      return res.json({ success: false, message: 'You need to provide the amount of blog posts that you are requesting.'});
    }

    Blog.find({}, { title: 1}, (err, blogs) => {
      if (err) {
        return res.json({ success: false, message: 'Could not find blog. Error ' + err});
      }

      if (!blogs) {
        return res.json({ success: false, message: 'No blogs have been created.'});
      }

      return res.json({ success: true, blogs: blogs});
    }).sort({ '_id': -1 }).limit(parseInt(req.query.amount));
  });

  return router;
}
