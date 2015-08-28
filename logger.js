module.exports = function(request, response, next) {
  // the + sign converts date object to milliseconds
  var start = +new Date();
  // stands for standard output which is a writeable stream
  var stream = process.stdout;
  var url = request.url;
  var method = request.method;
  response.on('finish', function() {
    var duration = +new Date() - start;
    var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n';
    stream.write(message);
  });
  //moves request to the next middleware in the stack
  next();

};
