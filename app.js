// npm install express
// to install a specific version of express
// npm install express@4.9
// npm install express@3.15.2

var express = require('express');
var app = express();

app.get('/', function(request, response) {
  response.send('Hello, this is dog');
  // same as
  //response.write('Hello, this is dog');
  //response.end();
});
app.get('/blocks', function(request, response) {
  var blocks = ['Fixed', 'Movable', 'Rotating'];
  response.send(blocks);
});
app.listen(3000, function() {
  console.log('Listening on port 3000');
});
// curl http://localhost:3000/
