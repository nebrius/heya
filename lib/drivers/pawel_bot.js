"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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

var PawelBot = exports.PawelBot = (function () {
  function PawelBot() {
    var _this = this;

    var opts = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, PawelBot);

    this[options] = opts;
    this[currentPosition] = {
      x: 0,
      y: 0
    };
    this[xAxis] = {
      move: function (value) {
        _this[currentPosition].x = value;
        _this[move]();
      },
      type: inputTypes.LINEAR,
      connect: this[connect]
    };
    this[yAxis] = {
      move: function (value) {
        _this[currentPosition].y = value;
        _this[move]();
      },
      type: inputTypes.LINEAR,
      connect: this[connect]
    };
  }

  _prototypeProperties(PawelBot, null, (function () {
    var _prototypeProperties2 = {
      getDriverAxes: {
        value: function getDriverAxes() {
          return {
            x: this[xAxis],
            y: this[yAxis]
          };
        },
        writable: true,
        configurable: true
      }
    };

    _defineProperty(_prototypeProperties2, connect, {
      value: function (cb) {},
      writable: true,
      configurable: true
    });

    _defineProperty(_prototypeProperties2, move, {
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
      },
      writable: true,
      configurable: true
    });

    return _prototypeProperties2;
  })());

  return PawelBot;
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
//# sourceMappingURL=data:application/json;base64,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SUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzFCLG9CQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDO0FBQ2xDLG1CQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ2YsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN6QixtQkFBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2Ysb0JBQVUsR0FBRyxDQUFDLEdBQUcsZUFBZSxDQUFDO1NBQ2xDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDMUIsbUJBQVMsR0FBRyxDQUFDLEdBQUcsZUFBZSxDQUFDO0FBQ2hDLG9CQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDakI7QUFDRCxZQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUU7QUFDakIsY0FBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNoQyxNQUFNO0FBQ0wsY0FBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDaEM7QUFDRCxZQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUU7QUFDbEIsY0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNuQyxNQUFNO0FBQ0wsY0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDakM7T0FDRjs7Ozs7Ozs7U0FwRVUsUUFBUSIsImZpbGUiOiJkcml2ZXJzL3Bhd2VsX2JvdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE1IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgeyBpbnB1dFR5cGVzIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCBldmVudHMgZnJvbSAnZXZlbnRzJztcblxudmFyIHhBeGlzID0gU3ltYm9sKCd4QXhpcycpO1xudmFyIHlBeGlzID0gU3ltYm9sKCd5QXhpcycpO1xudmFyIGN1cnJlbnRQb3NpdGlvbiA9IFN5bWJvbCgnY3VycmVudFBvc2l0aW9uJyk7XG52YXIgbW92ZSA9IFN5bWJvbCgnbW92ZScpO1xudmFyIG9wdGlvbnMgPSBTeW1ib2woJ29wdGlvbnMnKTtcbnZhciBjb25uZWN0ID0gU3ltYm9sKCdjb25uZWN0Jyk7XG5cbmV4cG9ydCBjbGFzcyBQYXdlbEJvdCB7XG5cbiAgY29uc3RydWN0b3Iob3B0cyA9IHt9KSB7XG4gICAgdGhpc1tvcHRpb25zXSA9IG9wdHM7XG4gICAgdGhpc1tjdXJyZW50UG9zaXRpb25dID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICAgIHRoaXNbeEF4aXNdID0ge1xuICAgICAgbW92ZTogKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXNbY3VycmVudFBvc2l0aW9uXS54ID0gdmFsdWU7XG4gICAgICAgIHRoaXNbbW92ZV0oKTtcbiAgICAgIH0sXG4gICAgICB0eXBlOiBpbnB1dFR5cGVzLkxJTkVBUixcbiAgICAgIGNvbm5lY3Q6IHRoaXNbY29ubmVjdF1cbiAgICB9O1xuICAgIHRoaXNbeUF4aXNdID0ge1xuICAgICAgbW92ZTogKHZhbHVlKSA9PiB7XG4gICAgICAgIHRoaXNbY3VycmVudFBvc2l0aW9uXS55ID0gdmFsdWU7XG4gICAgICAgIHRoaXNbbW92ZV0oKTtcbiAgICAgIH0sXG4gICAgICB0eXBlOiBpbnB1dFR5cGVzLkxJTkVBUixcbiAgICAgIGNvbm5lY3Q6IHRoaXNbY29ubmVjdF1cbiAgICB9O1xuICB9XG5cbiAgZ2V0RHJpdmVyQXhlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpc1t4QXhpc10sXG4gICAgICB5OiB0aGlzW3lBeGlzXVxuICAgIH1cbiAgfVxuXG4gIFtjb25uZWN0XShjYikge1xuXG4gIH1cblxuICBbbW92ZV0oKSB7XG4gICAgdmFyIGxlZnRTcGVlZDtcbiAgICB2YXIgcmlnaHRTcGVlZDtcbiAgICB2YXIgeyB4LCB5IH0gPSB0aGlzW2N1cnJlbnRQb3NpdGlvbl07XG4gICAgdmFyIG5vcm1hbGl6ZWRBbmdsZSA9IDIgKiBNYXRoLmF0YW4oeSAvIHgpIC8gKE1hdGguUEkgLyAyKTtcbiAgICBpZiAoTWF0aC5hYnMoeCkgPCAwLjEgJiYgTWF0aC5hYnMoeSkgPCAwLjEpIHtcbiAgICAgIGxlZnRTcGVlZCA9IDA7XG4gICAgICByaWdodFNwZWVkID0gMDtcbiAgICB9IGVsc2UgaWYgKHggPj0gMCAmJiB5ID49IDApIHtcbiAgICAgIHJpZ2h0U3BlZWQgPSAxO1xuICAgICAgbGVmdFNwZWVkID0gLTEgKyBub3JtYWxpemVkQW5nbGU7XG4gICAgfSBlbHNlIGlmICh4IDwgMCAmJiB5ID49IDApIHtcbiAgICAgIHJpZ2h0U3BlZWQgPSAtMSAtIG5vcm1hbGl6ZWRBbmdsZTtcbiAgICAgIGxlZnRTcGVlZCA9IDE7XG4gICAgfSBlbHNlIGlmICh4IDwgMCAmJiB5IDwgMCkge1xuICAgICAgbGVmdFNwZWVkID0gLTE7XG4gICAgICByaWdodFNwZWVkID0gMSAtIG5vcm1hbGl6ZWRBbmdsZTtcbiAgICB9IGVsc2UgaWYgKHggPj0gMCAmJiB5IDwgMCkge1xuICAgICAgbGVmdFNwZWVkID0gMSArIG5vcm1hbGl6ZWRBbmdsZTtcbiAgICAgIHJpZ2h0U3BlZWQgPSAtMTtcbiAgICB9XG4gICAgaWYgKGxlZnRTcGVlZCA8IDEpIHtcbiAgICAgIHRoaXMuX2xlZnRTZXJ2by5jdygtbGVmdFNwZWVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbGVmdFNlcnZvLmNjdyhsZWZ0U3BlZWQpO1xuICAgIH1cbiAgICBpZiAocmlnaHRTcGVlZCA8IDEpIHtcbiAgICAgIHRoaXMuX3JpZ2h0U2Vydm8uY2N3KC1yaWdodFNwZWVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmlnaHRTZXJ2by5jdyhyaWdodFNwZWVkKTtcbiAgICB9XG4gIH1cbn1cblxuLypcblBhd2VsQm90LnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24oY2IpIHtcbiAgdmFyIGZpdmUgPSByZXF1aXJlKCdqb2hubnktZml2ZScpO1xuICB2YXIgYm9hcmQgPSBuZXcgZml2ZS5Cb2FyZCh7XG4gICAgcmVwbDogZmFsc2UsXG4gICAgaW86IHRoaXMuX29wdGlvbnMuaW8sXG4gICAgaWQ6ICdwYXdlbF9ib3QnXG4gIH0pO1xuXG4gIGJvYXJkLm9uKCdyZWFkeScsIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2xlZnRTZXJ2byA9IG5ldyBmaXZlLlNlcnZvKHtcbiAgICAgIHBpbjogdGhpcy5fb3B0aW9ucy5sZWZ0U2Vydm8sXG4gICAgICB0eXBlOiAnY29udGludW91cycsXG4gICAgICBpZDogJ3Bhd2VsX2JvdCdcbiAgICB9KTtcblxuICAgIHRoaXMuX3JpZ2h0U2Vydm8gPSBuZXcgZml2ZS5TZXJ2byh7XG4gICAgICBwaW46IHRoaXMuX29wdGlvbnMucmlnaHRTZXJ2byxcbiAgICAgIHR5cGU6ICdjb250aW51b3VzJyxcbiAgICAgIGlkOiAncGF3ZWxfYm90J1xuICAgIH0pO1xuXG4gICAgdGhpcy5fbGVmdFNlcnZvLnN0b3AoKTtcbiAgICB0aGlzLl9yaWdodFNlcnZvLnN0b3AoKTtcblxuICAgIGNiKCk7XG4gIH0uYmluZCh0aGlzKSk7XG59O1xuKi9cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==