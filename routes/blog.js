const User = require('../models/user');
const Blog = require('../models/blog');
const config = require('../config/database');

module.exports = (router) => {
  router.post('/new', (req, res) => {

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

    let blog = new Blog({
      title: req.body.title,
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

  return router;
}
