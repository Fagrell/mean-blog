const zone = require('./client/node_modules/zone.js/dist/zone-node');
const metadata = require('./client/node_modules/reflect-metadata');

const ngExpressEngine = require('./client/node_modules/@nguniversal/express-engine');
const provideModuleMap = require('./client/node_modules/@nguniversal/module-map-ngfactory-loader');

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
const compression = require('./client/node_modules/compression');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./public/server/main');

const port = process.env.PORT || 8080;

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

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.use(express.static(__dirname + '/public/browser'));
app.set('view engine', 'html');
app.set('views', '/public/browser');

app.get('/redirect/**', (req, res) => {
  const location = req.url.substring(10);
  res.redirect(301, location);
});

app.get('*.*', express.static('/public/browser', {
  maxAge: '1y'
}));

app.use('/authentication', authentication);
app.use('/blog', blog);

app.get('/*', (req, res) => {
  res.render('index', {req, res}, (err, html) => {
    if (html) {
      res.send(html);
    } else {
      console.error(err);
      res.send(err);
    }
  });
});

app.listen(port, () => {
  console.log('Listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode');
});
