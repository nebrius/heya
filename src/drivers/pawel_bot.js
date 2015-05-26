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

PawelBot.prototype.move = function move(x, y) {
  var leftSpeed;
  var rightSpeed;
  var normalizedAngle = 2 * Math.atan(y / x) / (Math.PI / 2);
  if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
    leftSpeed = 0;
    rightSpeed = 0;
  } else if (x >= 0 && y >= 0) {
    leftSpeed = 1;
    rightSpeed = 1 - normalizedAngle;
  } else if (x < 0 && y >= 0) {
    leftSpeed = -1 - normalizedAngle;
    rightSpeed = 1;
  } else if (x < 0 && y < 0) {
    leftSpeed = -1;
    rightSpeed = 1 - normalizedAngle;
  } else if (x >= 0 && y < 0) {
    leftSpeed = 1 + normalizedAngle;
    rightSpeed = -1;
  }
  if (leftSpeed < 1) {
    this._leftServo.cw(-leftSpeed);
  } else {
    this._leftServo.ccw(leftSpeed);
  }
  if (rightSpeed < 1) {
    this._rightServo.ccw(-rightSpeed);
  } else {
    this._rightServo.cw(rightSpeed);
  }
};
