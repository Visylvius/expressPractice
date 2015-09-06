var express = require('express');
var street = express.street();
var streets = {
  "narrow": 'long and slender',
  "windy": 'down a long dusty road',
  'crooked': 'never straight'
};
street.route('/')
  .get(function(request, response) {
    response.json(Object.keys(streets));
  });
