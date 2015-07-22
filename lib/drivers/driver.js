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

              var _axesToDifferential = axesToDifferential(xValue, yValue);

              var left = _axesToDifferential.left;
              var right = _axesToDifferential.right;

              logger.debug("Driver " + spec.name + " responded to analog 2D differential value (" + xValue + "," + yValue + ")");
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
//# sourceMappingURL=data:application/json;base64,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QUksb0RBQStDLE1BQU0sU0FBSSxNQUFNLE9BQUksQ0FBQztBQUNwRyxvQkFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7YUFDN0IsQ0FBQyxDQUFDO1dBQ0o7U0FDRjs7QUFFRCxZQUFNLFVBQVUsR0FBRztBQUNqQixjQUFJLEVBQUUsSUFBSSxHQUFHLE9BQU87QUFDcEIsY0FBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ2xCLGdCQUFNLEVBQUUsSUFBSTtBQUNaLGlCQUFPLEVBQUUsVUFBQyxJQUFJLEVBQUs7QUFDakIsa0JBQU0sR0FBRyxJQUFJLENBQUM7QUFDZCxtQkFBTyxFQUFFLENBQUM7V0FDWDtTQUNGLENBQUM7QUFDRixZQUFNLFdBQVcsR0FBRztBQUNsQixjQUFJLEVBQUUsSUFBSSxHQUFHLFFBQVE7QUFDckIsY0FBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ2xCLGdCQUFNLEVBQUUsSUFBSTtBQUNaLGlCQUFPLEVBQUUsVUFBQyxJQUFJLEVBQUs7QUFDakIsa0JBQU0sR0FBRyxJQUFJLENBQUM7QUFDZCxtQkFBTyxFQUFFLENBQUM7V0FDWDtTQUNGLENBQUM7QUFDRixZQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7QUFDWCxjQUFJLEVBQUUsVUFBVTtBQUNoQixlQUFLLEVBQUUsV0FBVztTQUNuQixDQUFDO09BQ0g7OztXQXRFRyxNQUFNOzs7QUF5RVosU0FBTyxNQUFNLENBQUM7Q0FDZiIsImZpbGUiOiJkcml2ZXJzL2RyaXZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE1IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgeyB0eXBlcywgb3V0cHV0VHlwZXMgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgYXhlc1RvRGlmZmVyZW50aWFsIH0gZnJvbSAnLi4vZmlsdGVycy9heGVzX3RvX2RpZmZlcmVudGlhbC9heGVzX3RvX2RpZmZlcmVudGlhbC5qcyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2xvZ2dpbmcuanMnO1xuXG5jb25zdCBzZXR1cEFuYWxvZzJERGlmZmVyZW50aWFsID0gU3ltYm9sKCdzZXR1cEFuYWxvZzJERGlmZmVyZW50aWFsJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEcml2ZXIoc3BlYykge1xuICBpZiAodHlwZW9mIHNwZWMuaW5pdGlhbGl6ZSAhPSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBzcGVjLmNvbm5lY3QgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkcml2ZXIgZGVmaW5pdGlvbicpO1xuICB9XG4gIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgZHJpdmVyICR7c3BlYy5uYW1lfWApO1xuXG4gIGNsYXNzIERyaXZlciB7XG4gICAgY29uc3RydWN0b3IoLi4ub3B0cykge1xuICAgICAgc3BlYy5pbml0aWFsaXplKC4uLm9wdHMpO1xuXG4gICAgICB0aGlzLnR5cGUgPSB0eXBlcy5EUklWRVI7XG4gICAgICB0aGlzLm91dHB1dHMgPSB7fTtcbiAgICAgIHRoaXMubmFtZSA9IHNwZWMubmFtZTtcblxuICAgICAgY29uc3Qgb3V0cHV0cyA9IHNwZWMub3V0cHV0cztcbiAgICAgIGlmICghb3V0cHV0cyB8fCB0eXBlb2Ygb3V0cHV0cyAhPSAnb2JqZWN0Jykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgb3V0cHV0cyBmb3IgJHtzcGVjLm5hbWUgfHwgJ3VubmFtZWQgZHJpdmVyJ31gKTtcbiAgICAgIH1cbiAgICAgIGxldCBvdXRwdXQ7IC8vIGVzbGludCBhbmQgYmFiZWwgZGlzYWdyZWUgb24gd2hldGhlciB0byB1c2UgbGV0IG9yIGNvbnN0IGlubGluZSBpbiB0aGUgZm9yLi4uaW5cbiAgICAgIGZvciAob3V0cHV0IGluIG91dHB1dHMpIHtcbiAgICAgICAgaWYgKG91dHB1dHMuaGFzT3duUHJvcGVydHkob3V0cHV0KSkge1xuICAgICAgICAgIHN3aXRjaCAob3V0cHV0c1tvdXRwdXRdLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2Ugb3V0cHV0VHlwZXMuQU5BTE9HXzJEX0RJRkZFUkVOVElBTDpcbiAgICAgICAgICAgICAgdGhpc1tzZXR1cEFuYWxvZzJERGlmZmVyZW50aWFsXShvdXRwdXQsIG91dHB1dHNbb3V0cHV0XSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGRyaXZlciBpbnB1dCB0eXBlICR7b3V0cHV0c1tvdXRwdXRdLnR5cGV9XCJgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25uZWN0KGNiKSB7XG4gICAgICBzcGVjLmNvbm5lY3QoY2IpO1xuICAgIH1cblxuICAgIFtzZXR1cEFuYWxvZzJERGlmZmVyZW50aWFsXShuYW1lLCBvdXRwdXQpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgV2lyaW5nIHVwIGRpZ2l0YWwgMkQgZGlyZWN0aW9uIGZvciBjb250cm9sbGVyICR7c3BlYy5uYW1lfWApO1xuXG4gICAgICBsZXQgeFZhbHVlO1xuICAgICAgbGV0IHlWYWx1ZTtcbiAgICAgIGxldCBpc1Jlc3BvbmRpbmcgPSBmYWxzZTtcbiAgICAgIGZ1bmN0aW9uIHJlc3BvbmQoKSB7XG4gICAgICAgIGlmICghaXNSZXNwb25kaW5nKSB7XG4gICAgICAgICAgaXNSZXNwb25kaW5nID0gdHJ1ZTtcbiAgICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4ge1xuICAgICAgICAgICAgaXNSZXNwb25kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCB7IGxlZnQsIHJpZ2h0IH0gPSBheGVzVG9EaWZmZXJlbnRpYWwoeFZhbHVlLCB5VmFsdWUpO1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKGBEcml2ZXIgJHtzcGVjLm5hbWV9IHJlc3BvbmRlZCB0byBhbmFsb2cgMkQgZGlmZmVyZW50aWFsIHZhbHVlICgke3hWYWx1ZX0sJHt5VmFsdWV9KWApO1xuICAgICAgICAgICAgb3V0cHV0LnJlc3BvbmQobGVmdCwgcmlnaHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxlZnRPdXRwdXQgPSB7XG4gICAgICAgIG5hbWU6IG5hbWUgKyAnX2xlZnQnLFxuICAgICAgICB0eXBlOiB0eXBlcy5BTkFMT0csXG4gICAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgICAgcmVzcG9uZDogKGRhdGEpID0+IHtcbiAgICAgICAgICB4VmFsdWUgPSBkYXRhO1xuICAgICAgICAgIHJlc3BvbmQoKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJpZ2h0T3V0cHV0ID0ge1xuICAgICAgICBuYW1lOiBuYW1lICsgJ19yaWdodCcsXG4gICAgICAgIHR5cGU6IHR5cGVzLkFOQUxPRyxcbiAgICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgICByZXNwb25kOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIHlWYWx1ZSA9IGRhdGE7XG4gICAgICAgICAgcmVzcG9uZCgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdGhpc1tuYW1lXSA9IHtcbiAgICAgICAgbGVmdDogbGVmdE91dHB1dCxcbiAgICAgICAgcmlnaHQ6IHJpZ2h0T3V0cHV0XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBEcml2ZXI7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=