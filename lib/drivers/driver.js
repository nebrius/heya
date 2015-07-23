"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createComputedClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var prop = props[i]; prop.configurable = true; if (prop.value) prop.writable = true; Object.defineProperty(target, prop.key, prop); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

exports.createDriver = createDriver;
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

var interimTypes = require("../constants.js").types;

var axesToDifferential = _interopRequire(require("../filters/axes_to_differential/axes_to_differential.js"));

var logger = _interopRequire(require("../logging.js"));

var types = Object.freeze({
  BINARY_STATE: "BINARY_STATE",
  ANALOG_2D_DIFFERENTIAL: "ANALOG_2D_DIFFERENTIAL"
});

exports.types = types;
var setupAnalog2DDifferential = Symbol("setupAnalog2DDifferential");
var armed = Symbol("armed");

function createDriver(spec) {
  if (typeof spec.initialize != "function" || typeof spec.connect != "function") {
    throw new Error("Invalid driver definition");
  }
  logger.debug("Creating driver " + spec.name);

  var Driver = (function () {
    function Driver() {
      for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
        opts[_key] = arguments[_key];
      }

      _classCallCheck(this, Driver);

      spec.initialize.apply(spec, opts);

      this.type = interimTypes.DRIVER;
      this.outputs = {};
      this.name = spec.name;

      var outputs = spec.outputs;
      if (!outputs || typeof outputs != "object") {
        throw new Error("Invalid outputs for " + (spec.name || "unnamed driver"));
      }
      var output = undefined; // eslint and babel disagree on whether to use let or const inline in the for...in
      for (output in outputs) {
        if (outputs.hasOwnProperty(output)) {
          switch (outputs[output].type) {
            case types.ANALOG_2D_DIFFERENTIAL:
              this[setupAnalog2DDifferential](output, outputs[output]);
              break;
            default:
              throw new Error("Unknown driver input type \"" + outputs[output].type + "\"");
          }
        }
      }
    }

    _createComputedClass(Driver, [{
      key: "connect",
      value: function connect(cb) {
        spec.connect(cb);
      }
    }, {
      key: "arm",
      value: function arm() {
        this[armed] = true;
      }
    }, {
      key: setupAnalog2DDifferential,
      value: function (name, output) {
        var _this = this;

        logger.debug("Wiring up analog 2D direction for driver " + spec.name);

        var xValue = undefined;
        var yValue = undefined;
        var isResponding = false;
        function respond() {
          if (!isResponding) {
            isResponding = true;
            setImmediate(function () {
              isResponding = false;

              var _axesToDifferential = axesToDifferential(xValue, yValue);

              var left = _axesToDifferential.left;
              var right = _axesToDifferential.right;

              logger.trace("Driver " + spec.name + " responded to analog 2D differential value (" + left + "," + right + ")");
              output.respond(left, right);
            });
          }
        }

        var leftOutput = {
          name: name + "_left",
          type: interimTypes.ANALOG,
          source: this,
          respond: function (data) {
            xValue = data;
            if (_this[armed]) {
              respond();
            }
          }
        };
        var rightOutput = {
          name: name + "_right",
          type: interimTypes.ANALOG,
          source: this,
          respond: function (data) {
            yValue = data;
            if (_this[armed]) {
              respond();
            }
          }
        };
        this[name] = {
          left: leftOutput,
          right: rightOutput
        };
      }
    }]);

    return Driver;
  })();

  return Driver;
}
//# sourceMappingURL=data:application/json;base64,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Q2YiLCJmaWxlIjoiZHJpdmVycy9kcml2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IHsgdHlwZXMgYXMgaW50ZXJpbVR5cGVzIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCBheGVzVG9EaWZmZXJlbnRpYWwgZnJvbSAnLi4vZmlsdGVycy9heGVzX3RvX2RpZmZlcmVudGlhbC9heGVzX3RvX2RpZmZlcmVudGlhbC5qcyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2xvZ2dpbmcuanMnO1xuXG5leHBvcnQgY29uc3QgdHlwZXMgPSBPYmplY3QuZnJlZXplKHtcbiAgQklOQVJZX1NUQVRFOiAnQklOQVJZX1NUQVRFJyxcbiAgQU5BTE9HXzJEX0RJRkZFUkVOVElBTDogJ0FOQUxPR18yRF9ESUZGRVJFTlRJQUwnXG59KTtcblxuY29uc3Qgc2V0dXBBbmFsb2cyRERpZmZlcmVudGlhbCA9IFN5bWJvbCgnc2V0dXBBbmFsb2cyRERpZmZlcmVudGlhbCcpO1xuY29uc3QgYXJtZWQgPSBTeW1ib2woJ2FybWVkJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEcml2ZXIoc3BlYykge1xuICBpZiAodHlwZW9mIHNwZWMuaW5pdGlhbGl6ZSAhPSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBzcGVjLmNvbm5lY3QgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkcml2ZXIgZGVmaW5pdGlvbicpO1xuICB9XG4gIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgZHJpdmVyICR7c3BlYy5uYW1lfWApO1xuXG4gIGNsYXNzIERyaXZlciB7XG4gICAgY29uc3RydWN0b3IoLi4ub3B0cykge1xuICAgICAgc3BlYy5pbml0aWFsaXplKC4uLm9wdHMpO1xuXG4gICAgICB0aGlzLnR5cGUgPSBpbnRlcmltVHlwZXMuRFJJVkVSO1xuICAgICAgdGhpcy5vdXRwdXRzID0ge307XG4gICAgICB0aGlzLm5hbWUgPSBzcGVjLm5hbWU7XG5cbiAgICAgIGNvbnN0IG91dHB1dHMgPSBzcGVjLm91dHB1dHM7XG4gICAgICBpZiAoIW91dHB1dHMgfHwgdHlwZW9mIG91dHB1dHMgIT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIG91dHB1dHMgZm9yICR7c3BlYy5uYW1lIHx8ICd1bm5hbWVkIGRyaXZlcid9YCk7XG4gICAgICB9XG4gICAgICBsZXQgb3V0cHV0OyAvLyBlc2xpbnQgYW5kIGJhYmVsIGRpc2FncmVlIG9uIHdoZXRoZXIgdG8gdXNlIGxldCBvciBjb25zdCBpbmxpbmUgaW4gdGhlIGZvci4uLmluXG4gICAgICBmb3IgKG91dHB1dCBpbiBvdXRwdXRzKSB7XG4gICAgICAgIGlmIChvdXRwdXRzLmhhc093blByb3BlcnR5KG91dHB1dCkpIHtcbiAgICAgICAgICBzd2l0Y2ggKG91dHB1dHNbb3V0cHV0XS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkFOQUxPR18yRF9ESUZGRVJFTlRJQUw6XG4gICAgICAgICAgICAgIHRoaXNbc2V0dXBBbmFsb2cyRERpZmZlcmVudGlhbF0ob3V0cHV0LCBvdXRwdXRzW291dHB1dF0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBkcml2ZXIgaW5wdXQgdHlwZSBcIiR7b3V0cHV0c1tvdXRwdXRdLnR5cGV9XCJgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25uZWN0KGNiKSB7XG4gICAgICBzcGVjLmNvbm5lY3QoY2IpO1xuICAgIH1cblxuICAgIGFybSgpIHtcbiAgICAgIHRoaXNbYXJtZWRdID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBbc2V0dXBBbmFsb2cyRERpZmZlcmVudGlhbF0obmFtZSwgb3V0cHV0KSB7XG4gICAgICBsb2dnZXIuZGVidWcoYFdpcmluZyB1cCBhbmFsb2cgMkQgZGlyZWN0aW9uIGZvciBkcml2ZXIgJHtzcGVjLm5hbWV9YCk7XG5cbiAgICAgIGxldCB4VmFsdWU7XG4gICAgICBsZXQgeVZhbHVlO1xuICAgICAgbGV0IGlzUmVzcG9uZGluZyA9IGZhbHNlO1xuICAgICAgZnVuY3Rpb24gcmVzcG9uZCgpIHtcbiAgICAgICAgaWYgKCFpc1Jlc3BvbmRpbmcpIHtcbiAgICAgICAgICBpc1Jlc3BvbmRpbmcgPSB0cnVlO1xuICAgICAgICAgIHNldEltbWVkaWF0ZSgoKSA9PiB7XG4gICAgICAgICAgICBpc1Jlc3BvbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgcmlnaHQgfSA9IGF4ZXNUb0RpZmZlcmVudGlhbCh4VmFsdWUsIHlWYWx1ZSk7XG4gICAgICAgICAgICBsb2dnZXIudHJhY2UoYERyaXZlciAke3NwZWMubmFtZX0gcmVzcG9uZGVkIHRvIGFuYWxvZyAyRCBkaWZmZXJlbnRpYWwgdmFsdWUgKCR7bGVmdH0sJHtyaWdodH0pYCk7XG4gICAgICAgICAgICBvdXRwdXQucmVzcG9uZChsZWZ0LCByaWdodCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgbGVmdE91dHB1dCA9IHtcbiAgICAgICAgbmFtZTogbmFtZSArICdfbGVmdCcsXG4gICAgICAgIHR5cGU6IGludGVyaW1UeXBlcy5BTkFMT0csXG4gICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgcmVzcG9uZDogKGRhdGEpID0+IHtcbiAgICAgICAgICB4VmFsdWUgPSBkYXRhO1xuICAgICAgICAgIGlmICh0aGlzW2FybWVkXSkge1xuICAgICAgICAgICAgcmVzcG9uZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJpZ2h0T3V0cHV0ID0ge1xuICAgICAgICBuYW1lOiBuYW1lICsgJ19yaWdodCcsXG4gICAgICAgIHR5cGU6IGludGVyaW1UeXBlcy5BTkFMT0csXG4gICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgcmVzcG9uZDogKGRhdGEpID0+IHtcbiAgICAgICAgICB5VmFsdWUgPSBkYXRhO1xuICAgICAgICAgIGlmICh0aGlzW2FybWVkXSkge1xuICAgICAgICAgICAgcmVzcG9uZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHRoaXNbbmFtZV0gPSB7XG4gICAgICAgIGxlZnQ6IGxlZnRPdXRwdXQsXG4gICAgICAgIHJpZ2h0OiByaWdodE91dHB1dFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gRHJpdmVyO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9