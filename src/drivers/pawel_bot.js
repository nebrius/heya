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

var LEFT_FORWARD = 180;
var LEFT_FORWARD_SLOW = 92.5;
var RIGHT_FORWARD = 0;
var RIGHT_FORWARD_SLOW = 87.5;
var LEFT_REVERSE = 0;
var LEFT_REVERSE_SLOW = 87;
var RIGHT_REVERSE = 180;
var RIGHT_REVERSE_SLOW = 93;

module.exports = PawelBot;

function PawelBot(options) {
  this._options = options;
}

PawelBot.prototype.connect = function(cb) {
  var five = require('johnny-five');
  var board = new five.Board({
    repl: false,
    io: this._options.io
  });

  board.on('ready', function() {
    this._leftServo = new five.Servo({
      pin: this._options.leftServo,
      type: 'continuous'
    });

    this._rightServo = new five.Servo({
      pin: this._options.rightServo,
      type: 'continuous'
    });

    this._leftServo.stop();
    this._rightServo.stop();

    cb();
  }.bind(this));
};

PawelBot.prototype.move = function move(direction) {
  switch(direction) {
    case 'none':
      this._leftServo.stop();
      this._rightServo.stop();
      break;
    case 'up':
      this._leftServo.to(LEFT_FORWARD);
      this._rightServo.to(RIGHT_FORWARD);
      break;
    case 'upright':
      this._leftServo.to(LEFT_FORWARD);
      this._rightServo.to(RIGHT_FORWARD_SLOW);
      break;
    case 'right':
      this._leftServo.to(LEFT_FORWARD);
      this._rightServo.to(RIGHT_REVERSE);
      break;
    case 'downright':
      this._leftServo.to(LEFT_REVERSE);
      this._rightServo.to(RIGHT_REVERSE_SLOW);
      break;
    case 'down':
      this._leftServo.to(LEFT_REVERSE);
      this._rightServo.to(RIGHT_REVERSE);
      break;
    case 'downleft':
      this._leftServo.to(LEFT_REVERSE_SLOW);
      this._rightServo.to(RIGHT_REVERSE);
      break;
    case 'left':
      this._leftServo.to(LEFT_REVERSE);
      this._rightServo.to(RIGHT_FORWARD);
      break;
    case 'upleft':
      this._leftServo.to(LEFT_FORWARD_SLOW);
      this._rightServo.to(RIGHT_FORWARD);
      break;
  }
};
