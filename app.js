// npm install express
// to install a specific version of express
// npm install express@4.9
// npm install express@3.15.2
//npm install body-parser

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var logger = require('./logger');
app.use(logger);
var blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};
var locations = {
  'Fixed': 'First floor',
  'Movable': 'Second floor',
  'Rotating': 'Penthouse'
};
app.post('/blocks', parseUrlencoded, function(request, response) {
  var newBlock = request.body;
  blocks[newBlock.name] = newBlock.description;
  response.status(201).json(newBlock.name);
});
app.get('/blocks', function(request, response) {
  response.json(Object.keys(blocks));
});
app.delete('/blocks/:name', function(request, response) {
  delete blocks[request.blockName];
  response.sendStatus(200);
});
// app.get('/', function(request, response) {
  // response.send('Hello, this is dog');
  // same as
  //response.write('Hello, this is dog');
  //response.end();
// });
// :name creates name property on the request.params object
app.param('name', function(request, response, next) {
  var name = request.params.name;
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
  // can be accessed from other routes in the application
  request.blockName = block;
  //must be called to resume request stack
  next();
});
app.get('/blocks/:name', function(request, response) {
  // request.params.name will return undefined when no property is found for a given block name
  // var name = request.params.name;
  // var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
  var description = blocks[request.blockName];
  //checks for the presence of a description to determine the response
  if (!description) {
    response.status(404).json('No description found for ' + request.params.name);
  } else {
    response.json(description);
  }
  //defaults to 200 success status code

  // var blocks = ['Fixed', 'Movable', 'Rotating'];
  // if (request.query.limit >= 0) {
  //   response.json(blocks.slice(0, request.query.limit));
  // } else {
    //better syntax for JSON objects and arrays is
    // response.json(blocks);
    //same as
    // response.send(blocks);
    // to redirect a path use the redirect function;
    //in order to make the path permanent you need to include
    // 301 as the first argument in the function;
    // response.redirect(301, '/parts');
  // }
});
app.get('/locations/:name', function(request, response) {
  var location = locations[request.blockName];
  var description = blocks[request.blockName];
  if (!description) {
    response.status(404).json('No description found for ' + request.params.name);
  } else {
    response.json(description);
  }
});
// app.listen(3000, function() {
//   console.log('Listening on port 3000');
// });
// curl http://localhost:3000/

//section 2
// app.get('/', function(request, response) {
//   response.sendFile(__dirname + '/public/index.html');
  // __dirname === name of the directory the currently executing script resides in.
// });
// using built in middleware 'static' to make the same call. Syntax as follows
app.use(express.static('public'));
// static middleware serving files from the public folder;
app.listen(3000, function() {
  console.log('listening on port 3000');
});

//executing middleware functions
//middleware a
// app.use(function(request, response, next) {
//   ....
//   next();
// });
// this continues until it reaches middleware D
// app.use(function(request, response, next) {
// ...
// response.send('done!');
// })
