const zone = require('zone.js/dist/zone-node');
const metadata = require('reflect-metadata');

const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database.js');
const path = require('path');
const authentication = require('./routes/authentication')(router);

const blog = require('./routes/blog')(router);
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./public/server/main');

const port = process.env.PORT || 8080;

import { enableProdMode } from '@angular/core';

enableProdMode();

mongoose.Promise = global.Promise
mongoose.connect(config.uri, (err) => {
  if (err)  {
    return console.log('Could not connect to database ', err);
  } 
  
  console.log('Connected to database: ' + config.db);
});

// Middlewares
app.use(compression());

app.use(cors({ origin: 'http://localhost:4200' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', './public/browser');

// app.get('/', (req, res) => { res.render('index', { req, res }); });
// app.get('/home', (req, res) => { res.render('index', { req, res }); });

// app.get('/redirect/**', (req, res) => {
//   const location = req.url.substring(10);
//   res.redirect(301, location);
// });

// API SPECIFIC
app.use('/authentication', authentication);
app.use('/blog', blog);

app.get('*.*', express.static('./public/browser', {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', {req, res}, (err, html) => {
    if (html) {
      return res.send(html);
    }
    console.error(err);
    res.send(err);
  });
});

app.listen(port, () => {
  console.log('Listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode');
});
