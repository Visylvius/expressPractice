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
street.route('/:name')
  .all(function(request, response, next) {
    var name = request.params.name;
    var street = name[0].toUpperCase() + name.slice(1).toLowerCase();
    request.streetName = street;
    next();
  });
module.exports = router;
