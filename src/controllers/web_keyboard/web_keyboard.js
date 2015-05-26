/*
The MIT License (MIT)

Copyright (c) 2015 Bryan Hughes <bryan@theoreticalideations.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var http = require('http');

module.exports = WebKeyboard;

function WebKeyboard(options) {
  this._options = options;
}
util.inherits(WebKeyboard, EventEmitter);

WebKeyboard.prototype.connect = function connect(cb) {
  var webpage = require('fs').readFileSync(__dirname + '/control.html').toString();
  http.createServer(function (req, res) {
    var url = require('url').parse(req.url);
    var move = url.path.match(/^\/move\/(.*)$/);
    if (move) {
      var x, y;
      switch(move[1]) {
        case 'up':
          x = 1;
          y = 0;
          break;
        case 'upright':
          x = 0.707;
          y = 0.707;
          break;
        case 'right':
          x = 0;
          y = 1;
          break;
        case 'downright':
          x = 0.707;
          y = -0.707;
          break;
        case 'down':
          x = 0;
          y = -1;
          break;
        case 'downleft':
          x = -0.707;
          y = -0.707;
          break;
        case 'left':
          x = -1;
          y = 0;
          break;
        case 'upleft':
          x = -0.707;
          y = 0.707;
          break;
        case 'none':
          x = 0;
          y = 0;
          break;
      }
      this.emit('move', {
        x: x,
        y: y
      });
      res.end();
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(webpage);
    }
  }.bind(this)).listen(this._options.port || 8000, '127.0.0.1', function() {
    cb();
    console.log('Open your browser and point it to http://127.0.0.1:' +
      (this._options.port || 8000) + ' to control the bot');
  }.bind(this));
};