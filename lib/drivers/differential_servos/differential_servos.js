"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var outputTypes = require("../../constants.js").outputTypes;

var createDriver = require("../driver.js").createDriver;

var DifferentialServos = createDriver({

  name: "DifferentialServos",

  initialize: function initialize(opts) {},

  connect: function connect(cb) {
    process.nextTick(cb);
  }
});

//var xAxis = Symbol('xAxis');
//var yAxis = Symbol('yAxis');
//var currentPosition = Symbol('currentPosition');
//var move = Symbol('move');
//var options = Symbol('options');
//var connect = Symbol('connect');

//export class DifferentialServos {
//
//  constructor(opts = {}) {
//    this[options] = opts;
//    this[currentPosition] = {
//      x: 0,
//      y: 0
//    };
//    this.motors = {
//      move: (...args) => {
//        console.log(args)
//      },
//      type: outputTypes.ANALOG_2D_DIFFERENTIAL,
//      connect: this[connect]
//    };
//    this.defaults = {
//      movement: this.motors
//    };
//  }
//
//  getBotInputs() {
//    return {
//      x: this[xAxis],
//      y: this[yAxis],
//      defaults: {
//        x,
//        y
//      }
//    }
//  }
//
//  [connect](cb) {
//    cb();
//  }
//
//  [move]() {
//    var leftSpeed;
//    var rightSpeed;
//    var { x, y } = this[currentPosition];
//    var normalizedAngle = 2 * Math.atan(y / x) / (Math.PI / 2);
//    if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
//      leftSpeed = 0;
//      rightSpeed = 0;
//    } else if (x >= 0 && y >= 0) {
//      rightSpeed = 1;
//      leftSpeed = -1 + normalizedAngle;
//    } else if (x < 0 && y >= 0) {
//      rightSpeed = -1 - normalizedAngle;
//      leftSpeed = 1;
//    } else if (x < 0 && y < 0) {
//      leftSpeed = -1;
//      rightSpeed = 1 - normalizedAngle;
//    } else if (x >= 0 && y < 0) {
//      leftSpeed = 1 + normalizedAngle;
//      rightSpeed = -1;
//    }
//    if (leftSpeed < 1) {
//      this._leftServo.cw(-leftSpeed);
//    } else {
//      this._leftServo.ccw(leftSpeed);
//    }
//    if (rightSpeed < 1) {
//      this._rightServo.ccw(-rightSpeed);
//    } else {
//      this._rightServo.cw(rightSpeed);
//    }
//  }
//}

/*
PawelBot.prototype.connect = function(cb) {
  var five = require('johnny-five');
  var board = new five.Board({
    repl: false,
    io: this._options.io,
    id: 'pawel_bot'
  });

  board.on('ready', function() {
    this._leftServo = new five.Servo({
      pin: this._options.leftServo,
      type: 'continuous',
      id: 'pawel_bot'
    });

    this._rightServo = new five.Servo({
      pin: this._options.rightServo,
      type: 'continuous',
      id: 'pawel_bot'
    });

    this._leftServo.stop();
    this._rightServo.stop();

    cb();
  }.bind(this));
};
*/
exports.DifferentialServos = DifferentialServos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyaXZlcnMvZGlmZmVyZW50aWFsX3NlcnZvcy9kaWZmZXJlbnRpYWxfc2Vydm9zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBd0JTLFdBQVcsV0FBUSxvQkFBb0IsRUFBdkMsV0FBVzs7SUFDWCxZQUFZLFdBQVEsY0FBYyxFQUFsQyxZQUFZOztBQUVkLElBQU0sa0JBQWtCLEdBQUcsWUFBWSxDQUFDOztBQUU3QyxNQUFJLEVBQUUsb0JBQW9COztBQUUxQixZQUFVLEVBQUEsb0JBQUMsSUFBSSxFQUFFLEVBRWhCOztBQUVELFNBQU8sRUFBQSxpQkFBQyxFQUFFLEVBQUU7QUFDVixXQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0dBQ3RCO0NBQ0YsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQVhVLGtCQUFrQixHQUFsQixrQkFBa0IiLCJmaWxlIjoiZHJpdmVycy9kaWZmZXJlbnRpYWxfc2Vydm9zL2RpZmZlcmVudGlhbF9zZXJ2b3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IHsgb3V0cHV0VHlwZXMgfSBmcm9tICcuLi8uLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgY3JlYXRlRHJpdmVyIH0gZnJvbSAnLi4vZHJpdmVyLmpzJztcblxuZXhwb3J0IGNvbnN0IERpZmZlcmVudGlhbFNlcnZvcyA9IGNyZWF0ZURyaXZlcih7XG5cbiAgbmFtZTogJ0RpZmZlcmVudGlhbFNlcnZvcycsXG5cbiAgaW5pdGlhbGl6ZShvcHRzKSB7XG5cbiAgfSxcblxuICBjb25uZWN0KGNiKSB7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhjYik7XG4gIH1cbn0pO1xuXG4vL3ZhciB4QXhpcyA9IFN5bWJvbCgneEF4aXMnKTtcbi8vdmFyIHlBeGlzID0gU3ltYm9sKCd5QXhpcycpO1xuLy92YXIgY3VycmVudFBvc2l0aW9uID0gU3ltYm9sKCdjdXJyZW50UG9zaXRpb24nKTtcbi8vdmFyIG1vdmUgPSBTeW1ib2woJ21vdmUnKTtcbi8vdmFyIG9wdGlvbnMgPSBTeW1ib2woJ29wdGlvbnMnKTtcbi8vdmFyIGNvbm5lY3QgPSBTeW1ib2woJ2Nvbm5lY3QnKTtcblxuLy9leHBvcnQgY2xhc3MgRGlmZmVyZW50aWFsU2Vydm9zIHtcbi8vXG4vLyAgY29uc3RydWN0b3Iob3B0cyA9IHt9KSB7XG4vLyAgICB0aGlzW29wdGlvbnNdID0gb3B0cztcbi8vICAgIHRoaXNbY3VycmVudFBvc2l0aW9uXSA9IHtcbi8vICAgICAgeDogMCxcbi8vICAgICAgeTogMFxuLy8gICAgfTtcbi8vICAgIHRoaXMubW90b3JzID0ge1xuLy8gICAgICBtb3ZlOiAoLi4uYXJncykgPT4ge1xuLy8gICAgICAgIGNvbnNvbGUubG9nKGFyZ3MpXG4vLyAgICAgIH0sXG4vLyAgICAgIHR5cGU6IG91dHB1dFR5cGVzLkFOQUxPR18yRF9ESUZGRVJFTlRJQUwsXG4vLyAgICAgIGNvbm5lY3Q6IHRoaXNbY29ubmVjdF1cbi8vICAgIH07XG4vLyAgICB0aGlzLmRlZmF1bHRzID0ge1xuLy8gICAgICBtb3ZlbWVudDogdGhpcy5tb3RvcnNcbi8vICAgIH07XG4vLyAgfVxuLy9cbi8vICBnZXRCb3RJbnB1dHMoKSB7XG4vLyAgICByZXR1cm4ge1xuLy8gICAgICB4OiB0aGlzW3hBeGlzXSxcbi8vICAgICAgeTogdGhpc1t5QXhpc10sXG4vLyAgICAgIGRlZmF1bHRzOiB7XG4vLyAgICAgICAgeCxcbi8vICAgICAgICB5XG4vLyAgICAgIH1cbi8vICAgIH1cbi8vICB9XG4vL1xuLy8gIFtjb25uZWN0XShjYikge1xuLy8gICAgY2IoKTtcbi8vICB9XG4vL1xuLy8gIFttb3ZlXSgpIHtcbi8vICAgIHZhciBsZWZ0U3BlZWQ7XG4vLyAgICB2YXIgcmlnaHRTcGVlZDtcbi8vICAgIHZhciB7IHgsIHkgfSA9IHRoaXNbY3VycmVudFBvc2l0aW9uXTtcbi8vICAgIHZhciBub3JtYWxpemVkQW5nbGUgPSAyICogTWF0aC5hdGFuKHkgLyB4KSAvIChNYXRoLlBJIC8gMik7XG4vLyAgICBpZiAoTWF0aC5hYnMoeCkgPCAwLjEgJiYgTWF0aC5hYnMoeSkgPCAwLjEpIHtcbi8vICAgICAgbGVmdFNwZWVkID0gMDtcbi8vICAgICAgcmlnaHRTcGVlZCA9IDA7XG4vLyAgICB9IGVsc2UgaWYgKHggPj0gMCAmJiB5ID49IDApIHtcbi8vICAgICAgcmlnaHRTcGVlZCA9IDE7XG4vLyAgICAgIGxlZnRTcGVlZCA9IC0xICsgbm9ybWFsaXplZEFuZ2xlO1xuLy8gICAgfSBlbHNlIGlmICh4IDwgMCAmJiB5ID49IDApIHtcbi8vICAgICAgcmlnaHRTcGVlZCA9IC0xIC0gbm9ybWFsaXplZEFuZ2xlO1xuLy8gICAgICBsZWZ0U3BlZWQgPSAxO1xuLy8gICAgfSBlbHNlIGlmICh4IDwgMCAmJiB5IDwgMCkge1xuLy8gICAgICBsZWZ0U3BlZWQgPSAtMTtcbi8vICAgICAgcmlnaHRTcGVlZCA9IDEgLSBub3JtYWxpemVkQW5nbGU7XG4vLyAgICB9IGVsc2UgaWYgKHggPj0gMCAmJiB5IDwgMCkge1xuLy8gICAgICBsZWZ0U3BlZWQgPSAxICsgbm9ybWFsaXplZEFuZ2xlO1xuLy8gICAgICByaWdodFNwZWVkID0gLTE7XG4vLyAgICB9XG4vLyAgICBpZiAobGVmdFNwZWVkIDwgMSkge1xuLy8gICAgICB0aGlzLl9sZWZ0U2Vydm8uY3coLWxlZnRTcGVlZCk7XG4vLyAgICB9IGVsc2Uge1xuLy8gICAgICB0aGlzLl9sZWZ0U2Vydm8uY2N3KGxlZnRTcGVlZCk7XG4vLyAgICB9XG4vLyAgICBpZiAocmlnaHRTcGVlZCA8IDEpIHtcbi8vICAgICAgdGhpcy5fcmlnaHRTZXJ2by5jY3coLXJpZ2h0U3BlZWQpO1xuLy8gICAgfSBlbHNlIHtcbi8vICAgICAgdGhpcy5fcmlnaHRTZXJ2by5jdyhyaWdodFNwZWVkKTtcbi8vICAgIH1cbi8vICB9XG4vL31cblxuLypcblBhd2VsQm90LnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24oY2IpIHtcbiAgdmFyIGZpdmUgPSByZXF1aXJlKCdqb2hubnktZml2ZScpO1xuICB2YXIgYm9hcmQgPSBuZXcgZml2ZS5Cb2FyZCh7XG4gICAgcmVwbDogZmFsc2UsXG4gICAgaW86IHRoaXMuX29wdGlvbnMuaW8sXG4gICAgaWQ6ICdwYXdlbF9ib3QnXG4gIH0pO1xuXG4gIGJvYXJkLm9uKCdyZWFkeScsIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2xlZnRTZXJ2byA9IG5ldyBmaXZlLlNlcnZvKHtcbiAgICAgIHBpbjogdGhpcy5fb3B0aW9ucy5sZWZ0U2Vydm8sXG4gICAgICB0eXBlOiAnY29udGludW91cycsXG4gICAgICBpZDogJ3Bhd2VsX2JvdCdcbiAgICB9KTtcblxuICAgIHRoaXMuX3JpZ2h0U2Vydm8gPSBuZXcgZml2ZS5TZXJ2byh7XG4gICAgICBwaW46IHRoaXMuX29wdGlvbnMucmlnaHRTZXJ2byxcbiAgICAgIHR5cGU6ICdjb250aW51b3VzJyxcbiAgICAgIGlkOiAncGF3ZWxfYm90J1xuICAgIH0pO1xuXG4gICAgdGhpcy5fbGVmdFNlcnZvLnN0b3AoKTtcbiAgICB0aGlzLl9yaWdodFNlcnZvLnN0b3AoKTtcblxuICAgIGNiKCk7XG4gIH0uYmluZCh0aGlzKSk7XG59O1xuKi9cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==