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
      key: setupAnalog2DDifferential,
      value: function (name, output) {
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

              logger.debug("Driver " + spec.name + " responded to analog 2D differential value (" + left + "," + right + ")");
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
            respond();
          }
        };
        var rightOutput = {
          name: name + "_right",
          type: interimTypes.ANALOG,
          source: this,
          respond: function (data) {
            yValue = data;
            respond();
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
//# sourceMappingURL=data:application/json;base64,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OztrQkFBbEQsSUFBSSx1QkFBSixJQUFJO2tCQUFFLEtBQUssdUJBQUwsS0FBSzs7QUFDbkIsb0JBQU0sQ0FBQyxLQUFLLGFBQVcsSUFBSSxDQUFDLElBQUksb0RBQStDLElBQUksU0FBSSxLQUFLLE9BQUksQ0FBQztBQUNqRyxvQkFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDN0IsQ0FBQyxDQUFDO1dBQ0o7U0FDRjs7QUFFRCxZQUFNLFVBQVUsR0FBRztBQUNqQixjQUFJLEVBQUUsSUFBSSxHQUFHLE9BQU87QUFDcEIsY0FBSSxFQUFFLFlBQVksQ0FBQyxNQUFNO0FBQ3pCLGdCQUFNLEVBQUUsSUFBSTtBQUNaLGlCQUFPLEVBQUUsVUFBQyxJQUFJLEVBQUs7QUFDakIsa0JBQU0sR0FBRyxJQUFJLENBQUM7QUFDZCxtQkFBTyxFQUFFLENBQUM7V0FDWDtTQUNGLENBQUM7QUFDRixZQUFNLFdBQVcsR0FBRztBQUNsQixjQUFJLEVBQUUsSUFBSSxHQUFHLFFBQVE7QUFDckIsY0FBSSxFQUFFLFlBQVksQ0FBQyxNQUFNO0FBQ3pCLGdCQUFNLEVBQUUsSUFBSTtBQUNaLGlCQUFPLEVBQUUsVUFBQyxJQUFJLEVBQUs7QUFDakIsa0JBQU0sR0FBRyxJQUFJLENBQUM7QUFDZCxtQkFBTyxFQUFFLENBQUM7V0FDWDtTQUNGLENBQUM7QUFDRixZQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7QUFDWCxjQUFJLEVBQUUsVUFBVTtBQUNoQixlQUFLLEVBQUUsV0FBVztTQUNuQixDQUFDO09BQ0g7OztXQXRFRyxNQUFNOzs7QUF5RVosU0FBTyxNQUFNLENBQUM7Q0FDZiIsImZpbGUiOiJkcml2ZXJzL2RyaXZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE1IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgeyB0eXBlcyBhcyBpbnRlcmltVHlwZXMgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IGF4ZXNUb0RpZmZlcmVudGlhbCBmcm9tICcuLi9maWx0ZXJzL2F4ZXNfdG9fZGlmZmVyZW50aWFsL2F4ZXNfdG9fZGlmZmVyZW50aWFsLmpzJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi4vbG9nZ2luZy5qcyc7XG5cbmV4cG9ydCBjb25zdCB0eXBlcyA9IE9iamVjdC5mcmVlemUoe1xuICBCSU5BUllfU1RBVEU6ICdCSU5BUllfU1RBVEUnLFxuICBBTkFMT0dfMkRfRElGRkVSRU5USUFMOiAnQU5BTE9HXzJEX0RJRkZFUkVOVElBTCdcbn0pO1xuXG5jb25zdCBzZXR1cEFuYWxvZzJERGlmZmVyZW50aWFsID0gU3ltYm9sKCdzZXR1cEFuYWxvZzJERGlmZmVyZW50aWFsJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEcml2ZXIoc3BlYykge1xuICBpZiAodHlwZW9mIHNwZWMuaW5pdGlhbGl6ZSAhPSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBzcGVjLmNvbm5lY3QgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkcml2ZXIgZGVmaW5pdGlvbicpO1xuICB9XG4gIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgZHJpdmVyICR7c3BlYy5uYW1lfWApO1xuXG4gIGNsYXNzIERyaXZlciB7XG4gICAgY29uc3RydWN0b3IoLi4ub3B0cykge1xuICAgICAgc3BlYy5pbml0aWFsaXplKC4uLm9wdHMpO1xuXG4gICAgICB0aGlzLnR5cGUgPSBpbnRlcmltVHlwZXMuRFJJVkVSO1xuICAgICAgdGhpcy5vdXRwdXRzID0ge307XG4gICAgICB0aGlzLm5hbWUgPSBzcGVjLm5hbWU7XG5cbiAgICAgIGNvbnN0IG91dHB1dHMgPSBzcGVjLm91dHB1dHM7XG4gICAgICBpZiAoIW91dHB1dHMgfHwgdHlwZW9mIG91dHB1dHMgIT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIG91dHB1dHMgZm9yICR7c3BlYy5uYW1lIHx8ICd1bm5hbWVkIGRyaXZlcid9YCk7XG4gICAgICB9XG4gICAgICBsZXQgb3V0cHV0OyAvLyBlc2xpbnQgYW5kIGJhYmVsIGRpc2FncmVlIG9uIHdoZXRoZXIgdG8gdXNlIGxldCBvciBjb25zdCBpbmxpbmUgaW4gdGhlIGZvci4uLmluXG4gICAgICBmb3IgKG91dHB1dCBpbiBvdXRwdXRzKSB7XG4gICAgICAgIGlmIChvdXRwdXRzLmhhc093blByb3BlcnR5KG91dHB1dCkpIHtcbiAgICAgICAgICBzd2l0Y2ggKG91dHB1dHNbb3V0cHV0XS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkFOQUxPR18yRF9ESUZGRVJFTlRJQUw6XG4gICAgICAgICAgICAgIHRoaXNbc2V0dXBBbmFsb2cyRERpZmZlcmVudGlhbF0ob3V0cHV0LCBvdXRwdXRzW291dHB1dF0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBkcml2ZXIgaW5wdXQgdHlwZSBcIiR7b3V0cHV0c1tvdXRwdXRdLnR5cGV9XCJgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25uZWN0KGNiKSB7XG4gICAgICBzcGVjLmNvbm5lY3QoY2IpO1xuICAgIH1cblxuICAgIFtzZXR1cEFuYWxvZzJERGlmZmVyZW50aWFsXShuYW1lLCBvdXRwdXQpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgV2lyaW5nIHVwIGFuYWxvZyAyRCBkaXJlY3Rpb24gZm9yIGRyaXZlciAke3NwZWMubmFtZX1gKTtcblxuICAgICAgbGV0IHhWYWx1ZTtcbiAgICAgIGxldCB5VmFsdWU7XG4gICAgICBsZXQgaXNSZXNwb25kaW5nID0gZmFsc2U7XG4gICAgICBmdW5jdGlvbiByZXNwb25kKCkge1xuICAgICAgICBpZiAoIWlzUmVzcG9uZGluZykge1xuICAgICAgICAgIGlzUmVzcG9uZGluZyA9IHRydWU7XG4gICAgICAgICAgc2V0SW1tZWRpYXRlKCgpID0+IHtcbiAgICAgICAgICAgIGlzUmVzcG9uZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3QgeyBsZWZ0LCByaWdodCB9ID0gYXhlc1RvRGlmZmVyZW50aWFsKHhWYWx1ZSwgeVZhbHVlKTtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZyhgRHJpdmVyICR7c3BlYy5uYW1lfSByZXNwb25kZWQgdG8gYW5hbG9nIDJEIGRpZmZlcmVudGlhbCB2YWx1ZSAoJHtsZWZ0fSwke3JpZ2h0fSlgKTtcbiAgICAgICAgICAgIG91dHB1dC5yZXNwb25kKGxlZnQsIHJpZ2h0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBsZWZ0T3V0cHV0ID0ge1xuICAgICAgICBuYW1lOiBuYW1lICsgJ19sZWZ0JyxcbiAgICAgICAgdHlwZTogaW50ZXJpbVR5cGVzLkFOQUxPRyxcbiAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICByZXNwb25kOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIHhWYWx1ZSA9IGRhdGE7XG4gICAgICAgICAgcmVzcG9uZCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29uc3QgcmlnaHRPdXRwdXQgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUgKyAnX3JpZ2h0JyxcbiAgICAgICAgdHlwZTogaW50ZXJpbVR5cGVzLkFOQUxPRyxcbiAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICByZXNwb25kOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIHlWYWx1ZSA9IGRhdGE7XG4gICAgICAgICAgcmVzcG9uZCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdGhpc1tuYW1lXSA9IHtcbiAgICAgICAgbGVmdDogbGVmdE91dHB1dCxcbiAgICAgICAgcmlnaHQ6IHJpZ2h0T3V0cHV0XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBEcml2ZXI7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=