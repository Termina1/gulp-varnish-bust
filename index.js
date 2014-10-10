var request = require('request');
var through = require('through2');
var _ = require('lodash');
var gutil = require('gulp-util');

module.exports = function(opts) {
  var options = _.extend({
    host: 'localhost',
    port: 80
  }, opts);
  return through.obj(function (chunk, enc, cb) {
    cb(null, chunk);
  }, function(cb) {
    request({
      method: 'BAN',
      uri: 'http://' + options.host + ":" + options.port,
      headers: {
        'X-Ban-Url': '.*'
      }
    }, function (error, response, body) {
      if (response.statusCode !== 201) {
        gutil.log(gutil.colors.red(error));
      } else {
        gutil.log(gutil.colors.green('Banned successful!'));
      }
      cb();
    });
  });
};