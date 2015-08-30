var express = require('express');
var app = express();
var blocks = {
  'Square': 'Its a square!',
  'Circle': 'Its a Circle!'
};
app.get('/', function(request, response) {
  response.send('hello this is dog');
});
