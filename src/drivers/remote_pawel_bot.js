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

var request = require('request');

var states = {};

module.exports = PawelBot;

function PawelBot(options) {
  this._options = options;
}

PawelBot.prototype.connect = function(cb) {
  console.log('Connecting to remote Pawel Bot...');
  var tryRequest = function tryRequest() {
    console.log(this._options.url + '/isReady');
    request({
      method: 'get',
      json: true,
      url: this._options.url + '/isReady'
    }, function (error, response, body) {
      if (!error) {
        cb();
      } else {
        console.log('Could not connect to remote Pawel Bot, retrying...');
        setTimeout(tryRequest, 500);
      }
    });
  }.bind(this);
  tryRequest();
};

PawelBot.prototype.move = function move(x, y) {
  request({
    method: 'post',
    json: true,
    url: this._options.url + '/update',
    body: {
      x: x,
      y: y
    }
  });
};
