"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

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

var events = _interopRequire(require("events"));

//var xAxis = Symbol('xAxis');
//var yAxis = Symbol('yAxis');
//var currentPosition = Symbol('currentPosition');
//var move = Symbol('move');
//var options = Symbol('options');
//var connect = Symbol('connect');

var DifferentialServos = createDriver({
  name: "DifferentialServos"
});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyaXZlcnMvZGlmZmVyZW50aWFsX3NlcnZvcy9kaWZmZXJlbnRpYWxfc2Vydm9zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3QlMsV0FBVyxXQUFRLG9CQUFvQixFQUF2QyxXQUFXOztJQUNYLFlBQVksV0FBUSxjQUFjLEVBQWxDLFlBQVk7O0lBQ2QsTUFBTSwyQkFBTSxRQUFROzs7Ozs7Ozs7QUFTcEIsSUFBTSxrQkFBa0IsR0FBRyxZQUFZLENBQUM7QUFDN0MsTUFBSSxFQUFFLG9CQUFvQjtDQUMzQixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFGVSxrQkFBa0IsR0FBbEIsa0JBQWtCIiwiZmlsZSI6ImRyaXZlcnMvZGlmZmVyZW50aWFsX3NlcnZvcy9kaWZmZXJlbnRpYWxfc2Vydm9zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTUgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCB7IG91dHB1dFR5cGVzIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGNyZWF0ZURyaXZlciB9IGZyb20gJy4uL2RyaXZlci5qcyc7XG5pbXBvcnQgZXZlbnRzIGZyb20gJ2V2ZW50cyc7XG5cbi8vdmFyIHhBeGlzID0gU3ltYm9sKCd4QXhpcycpO1xuLy92YXIgeUF4aXMgPSBTeW1ib2woJ3lBeGlzJyk7XG4vL3ZhciBjdXJyZW50UG9zaXRpb24gPSBTeW1ib2woJ2N1cnJlbnRQb3NpdGlvbicpO1xuLy92YXIgbW92ZSA9IFN5bWJvbCgnbW92ZScpO1xuLy92YXIgb3B0aW9ucyA9IFN5bWJvbCgnb3B0aW9ucycpO1xuLy92YXIgY29ubmVjdCA9IFN5bWJvbCgnY29ubmVjdCcpO1xuXG5leHBvcnQgY29uc3QgRGlmZmVyZW50aWFsU2Vydm9zID0gY3JlYXRlRHJpdmVyKHtcbiAgbmFtZTogJ0RpZmZlcmVudGlhbFNlcnZvcydcbn0pO1xuXG4vL2V4cG9ydCBjbGFzcyBEaWZmZXJlbnRpYWxTZXJ2b3Mge1xuLy9cbi8vICBjb25zdHJ1Y3RvcihvcHRzID0ge30pIHtcbi8vICAgIHRoaXNbb3B0aW9uc10gPSBvcHRzO1xuLy8gICAgdGhpc1tjdXJyZW50UG9zaXRpb25dID0ge1xuLy8gICAgICB4OiAwLFxuLy8gICAgICB5OiAwXG4vLyAgICB9O1xuLy8gICAgdGhpcy5tb3RvcnMgPSB7XG4vLyAgICAgIG1vdmU6ICguLi5hcmdzKSA9PiB7XG4vLyAgICAgICAgY29uc29sZS5sb2coYXJncylcbi8vICAgICAgfSxcbi8vICAgICAgdHlwZTogb3V0cHV0VHlwZXMuQU5BTE9HXzJEX0RJRkZFUkVOVElBTCxcbi8vICAgICAgY29ubmVjdDogdGhpc1tjb25uZWN0XVxuLy8gICAgfTtcbi8vICAgIHRoaXMuZGVmYXVsdHMgPSB7XG4vLyAgICAgIG1vdmVtZW50OiB0aGlzLm1vdG9yc1xuLy8gICAgfTtcbi8vICB9XG4vL1xuLy8gIGdldEJvdElucHV0cygpIHtcbi8vICAgIHJldHVybiB7XG4vLyAgICAgIHg6IHRoaXNbeEF4aXNdLFxuLy8gICAgICB5OiB0aGlzW3lBeGlzXSxcbi8vICAgICAgZGVmYXVsdHM6IHtcbi8vICAgICAgICB4LFxuLy8gICAgICAgIHlcbi8vICAgICAgfVxuLy8gICAgfVxuLy8gIH1cbi8vXG4vLyAgW2Nvbm5lY3RdKGNiKSB7XG4vLyAgICBjYigpO1xuLy8gIH1cbi8vXG4vLyAgW21vdmVdKCkge1xuLy8gICAgdmFyIGxlZnRTcGVlZDtcbi8vICAgIHZhciByaWdodFNwZWVkO1xuLy8gICAgdmFyIHsgeCwgeSB9ID0gdGhpc1tjdXJyZW50UG9zaXRpb25dO1xuLy8gICAgdmFyIG5vcm1hbGl6ZWRBbmdsZSA9IDIgKiBNYXRoLmF0YW4oeSAvIHgpIC8gKE1hdGguUEkgLyAyKTtcbi8vICAgIGlmIChNYXRoLmFicyh4KSA8IDAuMSAmJiBNYXRoLmFicyh5KSA8IDAuMSkge1xuLy8gICAgICBsZWZ0U3BlZWQgPSAwO1xuLy8gICAgICByaWdodFNwZWVkID0gMDtcbi8vICAgIH0gZWxzZSBpZiAoeCA+PSAwICYmIHkgPj0gMCkge1xuLy8gICAgICByaWdodFNwZWVkID0gMTtcbi8vICAgICAgbGVmdFNwZWVkID0gLTEgKyBub3JtYWxpemVkQW5nbGU7XG4vLyAgICB9IGVsc2UgaWYgKHggPCAwICYmIHkgPj0gMCkge1xuLy8gICAgICByaWdodFNwZWVkID0gLTEgLSBub3JtYWxpemVkQW5nbGU7XG4vLyAgICAgIGxlZnRTcGVlZCA9IDE7XG4vLyAgICB9IGVsc2UgaWYgKHggPCAwICYmIHkgPCAwKSB7XG4vLyAgICAgIGxlZnRTcGVlZCA9IC0xO1xuLy8gICAgICByaWdodFNwZWVkID0gMSAtIG5vcm1hbGl6ZWRBbmdsZTtcbi8vICAgIH0gZWxzZSBpZiAoeCA+PSAwICYmIHkgPCAwKSB7XG4vLyAgICAgIGxlZnRTcGVlZCA9IDEgKyBub3JtYWxpemVkQW5nbGU7XG4vLyAgICAgIHJpZ2h0U3BlZWQgPSAtMTtcbi8vICAgIH1cbi8vICAgIGlmIChsZWZ0U3BlZWQgPCAxKSB7XG4vLyAgICAgIHRoaXMuX2xlZnRTZXJ2by5jdygtbGVmdFNwZWVkKTtcbi8vICAgIH0gZWxzZSB7XG4vLyAgICAgIHRoaXMuX2xlZnRTZXJ2by5jY3cobGVmdFNwZWVkKTtcbi8vICAgIH1cbi8vICAgIGlmIChyaWdodFNwZWVkIDwgMSkge1xuLy8gICAgICB0aGlzLl9yaWdodFNlcnZvLmNjdygtcmlnaHRTcGVlZCk7XG4vLyAgICB9IGVsc2Uge1xuLy8gICAgICB0aGlzLl9yaWdodFNlcnZvLmN3KHJpZ2h0U3BlZWQpO1xuLy8gICAgfVxuLy8gIH1cbi8vfVxuXG4vKlxuUGF3ZWxCb3QucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbihjYikge1xuICB2YXIgZml2ZSA9IHJlcXVpcmUoJ2pvaG5ueS1maXZlJyk7XG4gIHZhciBib2FyZCA9IG5ldyBmaXZlLkJvYXJkKHtcbiAgICByZXBsOiBmYWxzZSxcbiAgICBpbzogdGhpcy5fb3B0aW9ucy5pbyxcbiAgICBpZDogJ3Bhd2VsX2JvdCdcbiAgfSk7XG5cbiAgYm9hcmQub24oJ3JlYWR5JywgZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fbGVmdFNlcnZvID0gbmV3IGZpdmUuU2Vydm8oe1xuICAgICAgcGluOiB0aGlzLl9vcHRpb25zLmxlZnRTZXJ2byxcbiAgICAgIHR5cGU6ICdjb250aW51b3VzJyxcbiAgICAgIGlkOiAncGF3ZWxfYm90J1xuICAgIH0pO1xuXG4gICAgdGhpcy5fcmlnaHRTZXJ2byA9IG5ldyBmaXZlLlNlcnZvKHtcbiAgICAgIHBpbjogdGhpcy5fb3B0aW9ucy5yaWdodFNlcnZvLFxuICAgICAgdHlwZTogJ2NvbnRpbnVvdXMnLFxuICAgICAgaWQ6ICdwYXdlbF9ib3QnXG4gICAgfSk7XG5cbiAgICB0aGlzLl9sZWZ0U2Vydm8uc3RvcCgpO1xuICAgIHRoaXMuX3JpZ2h0U2Vydm8uc3RvcCgpO1xuXG4gICAgY2IoKTtcbiAgfS5iaW5kKHRoaXMpKTtcbn07XG4qL1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9