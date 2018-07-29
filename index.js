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
const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise
mongoose.connect(config.uri, (err) => {
  if (err)  {
    return console.log('Could not connect to database ', err);
  } 
  
  console.log('Connected to database: ' + config.db);
});

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist/client'));
app.use('/authentication', authentication);
app.use('/blog', blog);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});

app.listen(port, () => {
  console.log('Listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode');
});
