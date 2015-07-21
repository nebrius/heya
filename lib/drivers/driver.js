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

var _constantsJs = require("../constants.js");

var types = _constantsJs.types;
var outputTypes = _constantsJs.outputTypes;

var axesToDifferential = require("../filters/axes_to_differential/axes_to_differential.js").axesToDifferential;

var logger = _interopRequire(require("../logging.js"));

var setupAnalog2DDifferential = Symbol("setupAnalog2DDifferential");

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

      this.type = types.DRIVER;
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
            case outputTypes.ANALOG_2D_DIFFERENTIAL:
              this[setupAnalog2DDifferential](output, outputs[output]);
              break;
            default:
              throw new Error("Unknown driver input type " + outputs[output].type + "\"");
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
      key: setupAnalog2DDifferential,
      value: function (name, output) {
        logger.debug("Wiring up digital 2D direction for controller " + spec.name);

        var xValue = undefined;
        var yValue = undefined;
        var isResponding = false;
        function respond() {
          if (!isResponding) {
            isResponding = true;
            setImmediate(function () {
              isResponding = false;
              logger.debug("Analog 2D differential value changed to (" + xValue + "," + yValue + ") to driver " + spec.name);

              var _axesToDifferential = axesToDifferential(xValue, yValue);

              var left = _axesToDifferential.left;
              var right = _axesToDifferential.right;

              output.respond(left, right);
            });
          }
        }

        var leftOutput = {
          name: name + "_left",
          type: types.ANALOG,
          source: this,
          respond: function (data) {
            xValue = data;
            respond();
          }
        };
        var rightOutput = {
          name: name + "_right",
          type: types.ANALOG,
          source: this,
          respond: function (data) {
            yValue = data;
            respond();
          }
        };
        this.outputs[name] = {
          left: leftOutput,
          right: rightOutput
        };
      }
    }]);

    return Driver;
  })();

  return Driver;
}
//# sourceMappingURL=data:application/json;base64,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QUksdUJBQUosSUFBSTtrQkFBRSxLQUFLLHVCQUFMLEtBQUs7O0FBQ25CLG9CQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQzthQUM3QixDQUFDLENBQUM7V0FDSjtTQUNGOztBQUVELFlBQU0sVUFBVSxHQUFHO0FBQ2pCLGNBQUksRUFBRSxJQUFJLEdBQUcsT0FBTztBQUNwQixjQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU07QUFDbEIsZ0JBQU0sRUFBRSxJQUFJO0FBQ1osaUJBQU8sRUFBRSxVQUFDLElBQUksRUFBSztBQUNqQixrQkFBTSxHQUFHLElBQUksQ0FBQztBQUNkLG1CQUFPLEVBQUUsQ0FBQztXQUNYO1NBQ0YsQ0FBQztBQUNGLFlBQU0sV0FBVyxHQUFHO0FBQ2xCLGNBQUksRUFBRSxJQUFJLEdBQUcsUUFBUTtBQUNyQixjQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU07QUFDbEIsZ0JBQU0sRUFBRSxJQUFJO0FBQ1osaUJBQU8sRUFBRSxVQUFDLElBQUksRUFBSztBQUNqQixrQkFBTSxHQUFHLElBQUksQ0FBQztBQUNkLG1CQUFPLEVBQUUsQ0FBQztXQUNYO1NBQ0YsQ0FBQztBQUNGLFlBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUc7QUFDbkIsY0FBSSxFQUFFLFVBQVU7QUFDaEIsZUFBSyxFQUFFLFdBQVc7U0FDbkIsQ0FBQztPQUNIOzs7V0F0RUcsTUFBTTs7O0FBeUVaLFNBQU8sTUFBTSxDQUFDO0NBQ2YiLCJmaWxlIjoiZHJpdmVycy9kcml2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IHsgdHlwZXMsIG91dHB1dFR5cGVzIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGF4ZXNUb0RpZmZlcmVudGlhbCB9IGZyb20gJy4uL2ZpbHRlcnMvYXhlc190b19kaWZmZXJlbnRpYWwvYXhlc190b19kaWZmZXJlbnRpYWwuanMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9sb2dnaW5nLmpzJztcblxuY29uc3Qgc2V0dXBBbmFsb2cyRERpZmZlcmVudGlhbCA9IFN5bWJvbCgnc2V0dXBBbmFsb2cyRERpZmZlcmVudGlhbCcpO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRHJpdmVyKHNwZWMpIHtcbiAgaWYgKHR5cGVvZiBzcGVjLmluaXRpYWxpemUgIT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygc3BlYy5jb25uZWN0ICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZHJpdmVyIGRlZmluaXRpb24nKTtcbiAgfVxuICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIGRyaXZlciAke3NwZWMubmFtZX1gKTtcblxuICBjbGFzcyBEcml2ZXIge1xuICAgIGNvbnN0cnVjdG9yKC4uLm9wdHMpIHtcbiAgICAgIHNwZWMuaW5pdGlhbGl6ZSguLi5vcHRzKTtcblxuICAgICAgdGhpcy50eXBlID0gdHlwZXMuRFJJVkVSO1xuICAgICAgdGhpcy5vdXRwdXRzID0ge307XG4gICAgICB0aGlzLm5hbWUgPSBzcGVjLm5hbWU7XG5cbiAgICAgIGNvbnN0IG91dHB1dHMgPSBzcGVjLm91dHB1dHM7XG4gICAgICBpZiAoIW91dHB1dHMgfHwgdHlwZW9mIG91dHB1dHMgIT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIG91dHB1dHMgZm9yICR7c3BlYy5uYW1lIHx8ICd1bm5hbWVkIGRyaXZlcid9YCk7XG4gICAgICB9XG4gICAgICBsZXQgb3V0cHV0OyAvLyBlc2xpbnQgYW5kIGJhYmVsIGRpc2FncmVlIG9uIHdoZXRoZXIgdG8gdXNlIGxldCBvciBjb25zdCBpbmxpbmUgaW4gdGhlIGZvci4uLmluXG4gICAgICBmb3IgKG91dHB1dCBpbiBvdXRwdXRzKSB7XG4gICAgICAgIGlmIChvdXRwdXRzLmhhc093blByb3BlcnR5KG91dHB1dCkpIHtcbiAgICAgICAgICBzd2l0Y2ggKG91dHB1dHNbb3V0cHV0XS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIG91dHB1dFR5cGVzLkFOQUxPR18yRF9ESUZGRVJFTlRJQUw6XG4gICAgICAgICAgICAgIHRoaXNbc2V0dXBBbmFsb2cyRERpZmZlcmVudGlhbF0ob3V0cHV0LCBvdXRwdXRzW291dHB1dF0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBkcml2ZXIgaW5wdXQgdHlwZSAke291dHB1dHNbb3V0cHV0XS50eXBlfVwiYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29ubmVjdChjYikge1xuICAgICAgc3BlYy5jb25uZWN0KGNiKTtcbiAgICB9XG5cbiAgICBbc2V0dXBBbmFsb2cyRERpZmZlcmVudGlhbF0obmFtZSwgb3V0cHV0KSB7XG4gICAgICBsb2dnZXIuZGVidWcoYFdpcmluZyB1cCBkaWdpdGFsIDJEIGRpcmVjdGlvbiBmb3IgY29udHJvbGxlciAke3NwZWMubmFtZX1gKTtcblxuICAgICAgbGV0IHhWYWx1ZTtcbiAgICAgIGxldCB5VmFsdWU7XG4gICAgICBsZXQgaXNSZXNwb25kaW5nID0gZmFsc2U7XG4gICAgICBmdW5jdGlvbiByZXNwb25kKCkge1xuICAgICAgICBpZiAoIWlzUmVzcG9uZGluZykge1xuICAgICAgICAgIGlzUmVzcG9uZGluZyA9IHRydWU7XG4gICAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgICAgICAgIGlzUmVzcG9uZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBBbmFsb2cgMkQgZGlmZmVyZW50aWFsIHZhbHVlIGNoYW5nZWQgdG8gKCR7eFZhbHVlfSwke3lWYWx1ZX0pIHRvIGRyaXZlciAke3NwZWMubmFtZX1gKTtcbiAgICAgICAgICAgIGNvbnN0IHsgbGVmdCwgcmlnaHQgfSA9IGF4ZXNUb0RpZmZlcmVudGlhbCh4VmFsdWUsIHlWYWx1ZSk7XG4gICAgICAgICAgICBvdXRwdXQucmVzcG9uZChsZWZ0LCByaWdodCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgbGVmdE91dHB1dCA9IHtcbiAgICAgICAgbmFtZTogbmFtZSArICdfbGVmdCcsXG4gICAgICAgIHR5cGU6IHR5cGVzLkFOQUxPRyxcbiAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICByZXNwb25kOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIHhWYWx1ZSA9IGRhdGE7XG4gICAgICAgICAgcmVzcG9uZCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgcmlnaHRPdXRwdXQgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUgKyAnX3JpZ2h0JyxcbiAgICAgICAgdHlwZTogdHlwZXMuQU5BTE9HLFxuICAgICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICAgIHJlc3BvbmQ6IChkYXRhKSA9PiB7XG4gICAgICAgICAgeVZhbHVlID0gZGF0YTtcbiAgICAgICAgICByZXNwb25kKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB0aGlzLm91dHB1dHNbbmFtZV0gPSB7XG4gICAgICAgIGxlZnQ6IGxlZnRPdXRwdXQsXG4gICAgICAgIHJpZ2h0OiByaWdodE91dHB1dFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gRHJpdmVyO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9