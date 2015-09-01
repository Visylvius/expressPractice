var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};
// the root path relative to the path where its mounted. which is app.use('/blocks', ) in the app.js folder
router.route('/')
  .get(function(request, response) {
  response.json(Object.keys(blocks));
  })
  .post(parseUrlencoded, function(request, response) {
  var newBlock = request.body;
  blocks[newBlock.name] = newBlock.description;
  response.status(201).json(newBlock.name);
  });

router.route('/:name')
  .all(function (request, response, next) {
  var name = request.params.name;
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
  // can be accessed from other routes in the application
  request.blockName = block;
  //must be called to resume request stack
  next();
  })
  .delete(function(request, response) {
  delete blocks[request.blockName];
  response.sendStatus(200);
  })
  .get(function(request, response) {
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
  });





module.exports = router;
