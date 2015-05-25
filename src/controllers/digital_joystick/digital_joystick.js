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

module.exports = DigitalJoystick;

function DigitalJoystick(options) {
  this._options = options;
}
util.inherits(DigitalJoystick, EventEmitter);

DigitalJoystick.prototype.connect = function connect(cb) {
  var five = require('johnny-five');
  var board = new five.Board({
    io: this._options.io,
    repl: false
  });

  board.on('ready', function() {
    var state = {
      up: false,
      right: false,
      down: false,
      left: false
    };

    var process = function process() {
      var key = 0;
      if (state.up) {
        key += 0x01;
      }
      if (state.right) {
        key += 0x02;
      }
      if (state.down) {
        key += 0x04;
      }
      if (state.left) {
        key += 0x08;
      }
      var direction;
      switch (key) {
        case 0x00:
          direction = 'none';
          break;
        case 0x01:
          direction = 'up';
          break;
        case 0x03:
          direction = 'upright';
          break;
        case 0x02:
          direction = 'right';
          break;
        case 0x06:
          direction = 'downright';
          break;
        case 0x04:
          direction = 'down';
          break;
        case 0x0C:
          direction = 'downleft';
          break;
        case 0x08:
          direction = 'left';
          break;
        case 0x09:
          direction = 'upleft';
          break;
      }
      if (direction) {
        this.emit('move', direction);
      }
    }.bind(this);

    function initPin(pin, name) {
      var button = new five.Button(pin);
      button.on('press', function() {
        state[name] = true;
        process();
      });
      button.on('release', function() {
        state[name] = false;
        process();
      });
    }

    initPin(this._options.left, 'left');
    initPin(this._options.right, 'right');
    initPin(this._options.up, 'up');
    initPin(this._options.down, 'down');

    cb();

  }.bind(this));
};
