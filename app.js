// npm install express
// to install a specific version of express
// npm install express@4.9
// npm install express@3.15.2
//npm install body-parser

var express = require('express');
var app = express();
var blocks = require('/routes/blocks');
app.use('/blocks', blocks);
var logger = require('./logger');
app.use(logger);
var blocksRoute = app.route('/blocks');

var locations = {
  'Fixed': 'First floor',
  'Movable': 'Second floor',
  'Rotating': 'Penthouse'
};
app.use('/blocks');
app.use('/blocks/:name');

// app.get('/', function(request, response) {
  // response.send('Hello, this is dog');
  // same as
  //response.write('Hello, this is dog');
  //response.end();
// });
// :name creates name property on the request.params object
app.param('name', function(request, response, next) {
  });

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
