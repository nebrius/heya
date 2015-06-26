"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createComputedClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var prop = props[i]; prop.configurable = true; if (prop.value) prop.writable = true; Object.defineProperty(target, prop.key, prop); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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

var inputTypes = require("../constants.js").inputTypes;

var events = _interopRequire(require("events"));

var xAxis = Symbol("xAxis");
var yAxis = Symbol("yAxis");
var currentPosition = Symbol("currentPosition");
var move = Symbol("move");
var options = Symbol("options");
var connect = Symbol("connect");

var DifferentialServos = exports.DifferentialServos = (function () {
  function DifferentialServos() {
    var _this = this;

    var opts = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, DifferentialServos);

    this[options] = opts;
    this[currentPosition] = {
      x: 0,
      y: 0
    };
    this.x = {
      move: function (value) {
        _this[currentPosition].x = value;
        _this[move]();
      },
      type: inputTypes.ANALOG_AXIS,
      connect: this[connect]
    };
    this.y = {
      move: function (value) {
        _this[currentPosition].y = value;
        _this[move]();
      },
      type: inputTypes.ANALOG_AXIS,
      connect: this[connect]
    };
    this.defaults = {
      x: this.x,
      y: this.y
    };
  }

  _createComputedClass(DifferentialServos, [{
    key: "getBotInputs",
    value: function getBotInputs() {
      return {
        x: this[xAxis],
        y: this[yAxis],
        defaults: {
          x: x,
          y: y
        }
      };
    }
  }, {
    key: connect,
    value: function (cb) {}
  }, {
    key: move,
    value: function () {
      var leftSpeed;
      var rightSpeed;
      var _currentPosition = this[currentPosition];
      var x = _currentPosition.x;
      var y = _currentPosition.y;

      var normalizedAngle = 2 * Math.atan(y / x) / (Math.PI / 2);
      if (Math.abs(x) < 0.1 && Math.abs(y) < 0.1) {
        leftSpeed = 0;
        rightSpeed = 0;
      } else if (x >= 0 && y >= 0) {
        rightSpeed = 1;
        leftSpeed = -1 + normalizedAngle;
      } else if (x < 0 && y >= 0) {
        rightSpeed = -1 - normalizedAngle;
        leftSpeed = 1;
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
    }
  }]);

  return DifferentialServos;
})();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyaXZlcnMvZGlmZmVyZW50aWFsX3NlcnZvcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXdCUyxVQUFVLFdBQVEsaUJBQWlCLEVBQW5DLFVBQVU7O0lBQ1osTUFBTSwyQkFBTSxRQUFROztBQUUzQixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ2hELElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQixJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUVuQixrQkFBa0IsV0FBbEIsa0JBQWtCO0FBRWxCLFdBRkEsa0JBQWtCLEdBRU47OztRQUFYLElBQUksZ0NBQUcsRUFBRTs7MEJBRlYsa0JBQWtCOztBQUczQixRQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxlQUFlLENBQUMsR0FBRztBQUN0QixPQUFDLEVBQUUsQ0FBQztBQUNKLE9BQUMsRUFBRSxDQUFDO0tBQ0wsQ0FBQztBQUNGLFFBQUksQ0FBQyxDQUFDLEdBQUc7QUFDUCxVQUFJLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDZixjQUFLLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDaEMsY0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDO09BQ2Q7QUFDRCxVQUFJLEVBQUUsVUFBVSxDQUFDLFdBQVc7QUFDNUIsYUFBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDdkIsQ0FBQztBQUNGLFFBQUksQ0FBQyxDQUFDLEdBQUc7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XG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE1IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgeyBpbnB1dFR5cGVzIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCBldmVudHMgZnJvbSAnZXZlbnRzJztcblxudmFyIHhBeGlzID0gU3ltYm9sKCd4QXhpcycpO1xudmFyIHlBeGlzID0gU3ltYm9sKCd5QXhpcycpO1xudmFyIGN1cnJlbnRQb3NpdGlvbiA9IFN5bWJvbCgnY3VycmVudFBvc2l0aW9uJyk7XG52YXIgbW92ZSA9IFN5bWJvbCgnbW92ZScpO1xudmFyIG9wdGlvbnMgPSBTeW1ib2woJ29wdGlvbnMnKTtcbnZhciBjb25uZWN0ID0gU3ltYm9sKCdjb25uZWN0Jyk7XG5cbmV4cG9ydCBjbGFzcyBEaWZmZXJlbnRpYWxTZXJ2b3Mge1xuXG4gIGNvbnN0cnVjdG9yKG9wdHMgPSB7fSkge1xuICAgIHRoaXNbb3B0aW9uc10gPSBvcHRzO1xuICAgIHRoaXNbY3VycmVudFBvc2l0aW9uXSA9IHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgICB0aGlzLnggPSB7XG4gICAgICBtb3ZlOiAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpc1tjdXJyZW50UG9zaXRpb25dLnggPSB2YWx1ZTtcbiAgICAgICAgdGhpc1ttb3ZlXSgpO1xuICAgICAgfSxcbiAgICAgIHR5cGU6IGlucHV0VHlwZXMuQU5BTE9HX0FYSVMsXG4gICAgICBjb25uZWN0OiB0aGlzW2Nvbm5lY3RdXG4gICAgfTtcbiAgICB0aGlzLnkgPSB7XG4gICAgICBtb3ZlOiAodmFsdWUpID0+IHtcbiAgICAgICAgdGhpc1tjdXJyZW50UG9zaXRpb25dLnkgPSB2YWx1ZTtcbiAgICAgICAgdGhpc1ttb3ZlXSgpO1xuICAgICAgfSxcbiAgICAgIHR5cGU6IGlucHV0VHlwZXMuQU5BTE9HX0FYSVMsXG4gICAgICBjb25uZWN0OiB0aGlzW2Nvbm5lY3RdXG4gICAgfTtcbiAgICB0aGlzLmRlZmF1bHRzID0ge1xuICAgICAgeDogdGhpcy54LFxuICAgICAgeTogdGhpcy55XG4gICAgfTtcbiAgfVxuXG4gIGdldEJvdElucHV0cygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpc1t4QXhpc10sXG4gICAgICB5OiB0aGlzW3lBeGlzXSxcbiAgICAgIGRlZmF1bHRzOiB7XG4gICAgICAgIHgsXG4gICAgICAgIHlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBbY29ubmVjdF0oY2IpIHtcblxuICB9XG5cbiAgW21vdmVdKCkge1xuICAgIHZhciBsZWZ0U3BlZWQ7XG4gICAgdmFyIHJpZ2h0U3BlZWQ7XG4gICAgdmFyIHsgeCwgeSB9ID0gdGhpc1tjdXJyZW50UG9zaXRpb25dO1xuICAgIHZhciBub3JtYWxpemVkQW5nbGUgPSAyICogTWF0aC5hdGFuKHkgLyB4KSAvIChNYXRoLlBJIC8gMik7XG4gICAgaWYgKE1hdGguYWJzKHgpIDwgMC4xICYmIE1hdGguYWJzKHkpIDwgMC4xKSB7XG4gICAgICBsZWZ0U3BlZWQgPSAwO1xuICAgICAgcmlnaHRTcGVlZCA9IDA7XG4gICAgfSBlbHNlIGlmICh4ID49IDAgJiYgeSA+PSAwKSB7XG4gICAgICByaWdodFNwZWVkID0gMTtcbiAgICAgIGxlZnRTcGVlZCA9IC0xICsgbm9ybWFsaXplZEFuZ2xlO1xuICAgIH0gZWxzZSBpZiAoeCA8IDAgJiYgeSA+PSAwKSB7XG4gICAgICByaWdodFNwZWVkID0gLTEgLSBub3JtYWxpemVkQW5nbGU7XG4gICAgICBsZWZ0U3BlZWQgPSAxO1xuICAgIH0gZWxzZSBpZiAoeCA8IDAgJiYgeSA8IDApIHtcbiAgICAgIGxlZnRTcGVlZCA9IC0xO1xuICAgICAgcmlnaHRTcGVlZCA9IDEgLSBub3JtYWxpemVkQW5nbGU7XG4gICAgfSBlbHNlIGlmICh4ID49IDAgJiYgeSA8IDApIHtcbiAgICAgIGxlZnRTcGVlZCA9IDEgKyBub3JtYWxpemVkQW5nbGU7XG4gICAgICByaWdodFNwZWVkID0gLTE7XG4gICAgfVxuICAgIGlmIChsZWZ0U3BlZWQgPCAxKSB7XG4gICAgICB0aGlzLl9sZWZ0U2Vydm8uY3coLWxlZnRTcGVlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2xlZnRTZXJ2by5jY3cobGVmdFNwZWVkKTtcbiAgICB9XG4gICAgaWYgKHJpZ2h0U3BlZWQgPCAxKSB7XG4gICAgICB0aGlzLl9yaWdodFNlcnZvLmNjdygtcmlnaHRTcGVlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JpZ2h0U2Vydm8uY3cocmlnaHRTcGVlZCk7XG4gICAgfVxuICB9XG59XG5cbi8qXG5QYXdlbEJvdC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uKGNiKSB7XG4gIHZhciBmaXZlID0gcmVxdWlyZSgnam9obm55LWZpdmUnKTtcbiAgdmFyIGJvYXJkID0gbmV3IGZpdmUuQm9hcmQoe1xuICAgIHJlcGw6IGZhbHNlLFxuICAgIGlvOiB0aGlzLl9vcHRpb25zLmlvLFxuICAgIGlkOiAncGF3ZWxfYm90J1xuICB9KTtcblxuICBib2FyZC5vbigncmVhZHknLCBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9sZWZ0U2Vydm8gPSBuZXcgZml2ZS5TZXJ2byh7XG4gICAgICBwaW46IHRoaXMuX29wdGlvbnMubGVmdFNlcnZvLFxuICAgICAgdHlwZTogJ2NvbnRpbnVvdXMnLFxuICAgICAgaWQ6ICdwYXdlbF9ib3QnXG4gICAgfSk7XG5cbiAgICB0aGlzLl9yaWdodFNlcnZvID0gbmV3IGZpdmUuU2Vydm8oe1xuICAgICAgcGluOiB0aGlzLl9vcHRpb25zLnJpZ2h0U2Vydm8sXG4gICAgICB0eXBlOiAnY29udGludW91cycsXG4gICAgICBpZDogJ3Bhd2VsX2JvdCdcbiAgICB9KTtcblxuICAgIHRoaXMuX2xlZnRTZXJ2by5zdG9wKCk7XG4gICAgdGhpcy5fcmlnaHRTZXJ2by5zdG9wKCk7XG5cbiAgICBjYigpO1xuICB9LmJpbmQodGhpcykpO1xufTtcbiovXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=