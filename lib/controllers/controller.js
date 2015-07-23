"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createComputedClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var prop = props[i]; prop.configurable = true; if (prop.value) prop.writable = true; Object.defineProperty(target, prop.key, prop); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

exports.createController = createController;
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

var EventEmitter = require("events").EventEmitter;

var interimTypes = require("../constants.js").types;

var directionToAxes = _interopRequire(require("../filters/direction_to_axes/direction_to_axes.js"));

var logger = _interopRequire(require("../logging.js"));

var types = Object.freeze({
  BINARY_STATE: "BINARY_STATE",
  DIGITAL_2D_DIRECTION: "DIGITAL_2D_DIRECTION",
  ANALOG_1D_DIRECTION: "ANALOG_1D_DIRECTION",
  ANALOG_2D_DIRECTION: "ANALOG_2D_DIRECTION"
});

exports.types = types;
var handleDigital2DDirection = Symbol("handleDigital2DDirection");
var handleAnalog1DDirection = Symbol("handleAnalog1DDirection");
var handleAnalog2DDirection = Symbol("handleAnalog2DDirection");
var handleBinaryState = Symbol("handleBinaryState");
var armed = Symbol("armed");

function createController(spec) {
  if (typeof spec.initialize != "function" || typeof spec.connect != "function") {
    throw new Error("Invalid controller definition");
  }
  logger.debug("Creating controller " + spec.name);

  var Controller = (function (_EventEmitter) {
    function Controller() {
      for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
        opts[_key] = arguments[_key];
      }

      _classCallCheck(this, Controller);

      _get(Object.getPrototypeOf(Controller.prototype), "constructor", this).call(this);
      spec.initialize.apply(spec, opts);

      this.type = interimTypes.CONTROLLER;
      this.inputs = {};
      this.name = spec.name;

      var inputs = spec.inputs;
      if (!inputs || typeof inputs != "object") {
        throw new Error("Invalid inputs for " + (spec.name || "unnamed controller"));
      }
      var input = undefined; // eslint and babel disagree on whether to use let or const inline in the for...in
      for (input in inputs) {
        if (inputs.hasOwnProperty(input)) {
          switch (inputs[input].type) {
            case types.DIGITAL_2D_DIRECTION:
              this[handleDigital2DDirection](input, inputs[input]);
              break;
            case types.ANALOG_1D_DIRECTION:
              this[handleAnalog1DDirection](input, inputs[input]);
              break;
            case types.ANALOG_2D_DIRECTION:
              this[handleAnalog2DDirection](input, inputs[input]);
              break;
            case types.BINARY_STATE:
              this[handleBinaryState](input, inputs[input]);
              break;
            default:
              throw new Error("Unknown controller input type \"" + inputs[input].type + "\"");
          }
        }
      }
    }

    _inherits(Controller, _EventEmitter);

    _createComputedClass(Controller, [{
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
      key: handleAnalog1DDirection,
      value: function (name, input) {
        var _this = this;

        logger.debug("Wiring up analog 1D direction for controller " + spec.name);
        var axisEmitter = Object.assign(new EventEmitter(), {
          name: name,
          type: interimTypes.ANALOG,
          source: this
        });
        this[name] = axisEmitter;
        input.on("change", function (value) {
          if (_this[armed]) {
            logger.trace("Controller " + spec.name + " emitted analog 1D direction value " + value);
            axisEmitter.emit("change", value);
          }
        });
      }
    }, {
      key: handleAnalog2DDirection,
      value: function (name, input) {
        var _this = this;

        logger.debug("Wiring up analog 2D direction for controller " + spec.name);
        var xEmitter = Object.assign(new EventEmitter(), {
          name: name + "_x",
          type: interimTypes.ANALOG,
          source: this
        });
        var yEmitter = Object.assign(new EventEmitter(), {
          name: name + "_y",
          type: interimTypes.ANALOG,
          source: this
        });
        this[name] = {
          x: xEmitter,
          y: yEmitter
        };
        input.on("change", function (_ref) {
          var x = _ref.x;
          var y = _ref.y;

          if (_this[armed]) {
            logger.trace("Controller " + spec.name + " emitted analog 2D direction value (" + x + ", " + y + ")");
            xEmitter.emit("change", x);
            yEmitter.emit("change", y);
          }
        });
      }
    }, {
      key: handleDigital2DDirection,
      value: function (name, input) {
        var _this = this;

        logger.debug("Wiring up digital 2D direction for controller " + spec.name);
        var xEmitter = Object.assign(new EventEmitter(), {
          name: name + "_x",
          type: interimTypes.ANALOG,
          source: this
        });
        var yEmitter = Object.assign(new EventEmitter(), {
          name: name + "_y",
          type: interimTypes.ANALOG,
          source: this
        });
        this[name] = {
          x: xEmitter,
          y: yEmitter
        };
        input.on("change", function (direction) {
          if (_this[armed]) {
            logger.trace("Controller " + spec.name + " emitted digital 2D direction value " + direction);

            var _directionToAxes = directionToAxes(direction);

            var x = _directionToAxes.x;
            var y = _directionToAxes.y;

            xEmitter.emit("change", x);
            yEmitter.emit("change", y);
          }
        });
      }
    }, {
      key: handleBinaryState,
      value: function (name, input) {}
    }]);

    return Controller;
  })(EventEmitter);

  if (spec.constants) {
    Object.assign(Controller, spec.constants);
  }

  return Controller;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O1FBMENnQixnQkFBZ0IsR0FBaEIsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBbEJ2QixZQUFZLFdBQVEsUUFBUSxFQUE1QixZQUFZOztJQUNILFlBQVksV0FBUSxpQkFBaUIsRUFBOUMsS0FBSzs7SUFDUCxlQUFlLDJCQUFNLG1EQUFtRDs7SUFDeEUsTUFBTSwyQkFBTSxlQUFlOztBQUUzQixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2pDLGNBQVksRUFBRSxjQUFjO0FBQzVCLHNCQUFvQixFQUFFLHNCQUFzQjtBQUM1QyxxQkFBbUIsRUFBRSxxQkFBcUI7QUFDMUMscUJBQW1CLEVBQUUscUJBQXFCO0NBQzNDLENBQUMsQ0FBQzs7UUFMVSxLQUFLLEdBQUwsS0FBSztBQU9sQixJQUFNLHdCQUF3QixHQUFHLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3BFLElBQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDbEUsSUFBTSx1QkFBdUIsR0FBRyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUNsRSxJQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3RELElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFdkIsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7QUFDckMsTUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksVUFBVSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxVQUFVLEVBQUU7QUFDN0UsVUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0dBQ2xEO0FBQ0QsUUFBTSxDQUFDLEtBQUssMEJBQXdCLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQzs7TUFFM0Ms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Q0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQzNDOztBQUVELFNBQU8sVUFBVSxDQUFDO0NBQ25CIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2NvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7IHR5cGVzIGFzIGludGVyaW1UeXBlcyB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgZGlyZWN0aW9uVG9BeGVzIGZyb20gJy4uL2ZpbHRlcnMvZGlyZWN0aW9uX3RvX2F4ZXMvZGlyZWN0aW9uX3RvX2F4ZXMuanMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9sb2dnaW5nLmpzJztcblxuZXhwb3J0IGNvbnN0IHR5cGVzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEJJTkFSWV9TVEFURTogJ0JJTkFSWV9TVEFURScsXG4gIERJR0lUQUxfMkRfRElSRUNUSU9OOiAnRElHSVRBTF8yRF9ESVJFQ1RJT04nLFxuICBBTkFMT0dfMURfRElSRUNUSU9OOiAnQU5BTE9HXzFEX0RJUkVDVElPTicsXG4gIEFOQUxPR18yRF9ESVJFQ1RJT046ICdBTkFMT0dfMkRfRElSRUNUSU9OJ1xufSk7XG5cbmNvbnN0IGhhbmRsZURpZ2l0YWwyRERpcmVjdGlvbiA9IFN5bWJvbCgnaGFuZGxlRGlnaXRhbDJERGlyZWN0aW9uJyk7XG5jb25zdCBoYW5kbGVBbmFsb2cxRERpcmVjdGlvbiA9IFN5bWJvbCgnaGFuZGxlQW5hbG9nMUREaXJlY3Rpb24nKTtcbmNvbnN0IGhhbmRsZUFuYWxvZzJERGlyZWN0aW9uID0gU3ltYm9sKCdoYW5kbGVBbmFsb2cyRERpcmVjdGlvbicpO1xuY29uc3QgaGFuZGxlQmluYXJ5U3RhdGUgPSBTeW1ib2woJ2hhbmRsZUJpbmFyeVN0YXRlJyk7XG5jb25zdCBhcm1lZCA9IFN5bWJvbCgnYXJtZWQnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoc3BlYykge1xuICBpZiAodHlwZW9mIHNwZWMuaW5pdGlhbGl6ZSAhPSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBzcGVjLmNvbm5lY3QgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb250cm9sbGVyIGRlZmluaXRpb24nKTtcbiAgfVxuICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIGNvbnRyb2xsZXIgJHtzcGVjLm5hbWV9YCk7XG5cbiAgY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBjb25zdHJ1Y3RvciguLi5vcHRzKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgc3BlYy5pbml0aWFsaXplKC4uLm9wdHMpO1xuXG4gICAgICB0aGlzLnR5cGUgPSBpbnRlcmltVHlwZXMuQ09OVFJPTExFUjtcbiAgICAgIHRoaXMuaW5wdXRzID0ge307XG4gICAgICB0aGlzLm5hbWUgPSBzcGVjLm5hbWU7XG5cbiAgICAgIGNvbnN0IGlucHV0cyA9IHNwZWMuaW5wdXRzO1xuICAgICAgaWYgKCFpbnB1dHMgfHwgdHlwZW9mIGlucHV0cyAhPSAnb2JqZWN0Jykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5wdXRzIGZvciAke3NwZWMubmFtZSB8fCAndW5uYW1lZCBjb250cm9sbGVyJ31gKTtcbiAgICAgIH1cbiAgICAgIGxldCBpbnB1dDsgLy8gZXNsaW50IGFuZCBiYWJlbCBkaXNhZ3JlZSBvbiB3aGV0aGVyIHRvIHVzZSBsZXQgb3IgY29uc3QgaW5saW5lIGluIHRoZSBmb3IuLi5pblxuICAgICAgZm9yIChpbnB1dCBpbiBpbnB1dHMpIHtcbiAgICAgICAgaWYgKGlucHV0cy5oYXNPd25Qcm9wZXJ0eShpbnB1dCkpIHtcbiAgICAgICAgICBzd2l0Y2ggKGlucHV0c1tpbnB1dF0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5ESUdJVEFMXzJEX0RJUkVDVElPTjpcbiAgICAgICAgICAgICAgdGhpc1toYW5kbGVEaWdpdGFsMkREaXJlY3Rpb25dKGlucHV0LCBpbnB1dHNbaW5wdXRdKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkFOQUxPR18xRF9ESVJFQ1RJT046XG4gICAgICAgICAgICAgIHRoaXNbaGFuZGxlQW5hbG9nMUREaXJlY3Rpb25dKGlucHV0LCBpbnB1dHNbaW5wdXRdKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkFOQUxPR18yRF9ESVJFQ1RJT046XG4gICAgICAgICAgICAgIHRoaXNbaGFuZGxlQW5hbG9nMkREaXJlY3Rpb25dKGlucHV0LCBpbnB1dHNbaW5wdXRdKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIHR5cGVzLkJJTkFSWV9TVEFURTpcbiAgICAgICAgICAgICAgdGhpc1toYW5kbGVCaW5hcnlTdGF0ZV0oaW5wdXQsIGlucHV0c1tpbnB1dF0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBjb250cm9sbGVyIGlucHV0IHR5cGUgXCIke2lucHV0c1tpbnB1dF0udHlwZX1cImApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbm5lY3QoY2IpIHtcbiAgICAgIHNwZWMuY29ubmVjdChjYik7XG4gICAgfVxuXG4gICAgYXJtKCkge1xuICAgICAgdGhpc1thcm1lZF0gPSB0cnVlO1xuICAgIH1cblxuICAgIFtoYW5kbGVBbmFsb2cxRERpcmVjdGlvbl0obmFtZSwgaW5wdXQpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgV2lyaW5nIHVwIGFuYWxvZyAxRCBkaXJlY3Rpb24gZm9yIGNvbnRyb2xsZXIgJHtzcGVjLm5hbWV9YCk7XG4gICAgICBjb25zdCBheGlzRW1pdHRlciA9IE9iamVjdC5hc3NpZ24obmV3IEV2ZW50RW1pdHRlcigpLCB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHR5cGU6IGludGVyaW1UeXBlcy5BTkFMT0csXG4gICAgICAgIHNvdXJjZTogdGhpc1xuICAgICAgfSk7XG4gICAgICB0aGlzW25hbWVdID0gYXhpc0VtaXR0ZXI7XG4gICAgICBpbnB1dC5vbignY2hhbmdlJywgKHZhbHVlKSA9PiB7XG4gICAgICAgIGlmICh0aGlzW2FybWVkXSkge1xuICAgICAgICAgIGxvZ2dlci50cmFjZShgQ29udHJvbGxlciAke3NwZWMubmFtZX0gZW1pdHRlZCBhbmFsb2cgMUQgZGlyZWN0aW9uIHZhbHVlICR7dmFsdWV9YCk7XG4gICAgICAgICAgYXhpc0VtaXR0ZXIuZW1pdCgnY2hhbmdlJywgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBbaGFuZGxlQW5hbG9nMkREaXJlY3Rpb25dKG5hbWUsIGlucHV0KSB7XG4gICAgICBsb2dnZXIuZGVidWcoYFdpcmluZyB1cCBhbmFsb2cgMkQgZGlyZWN0aW9uIGZvciBjb250cm9sbGVyICR7c3BlYy5uYW1lfWApO1xuICAgICAgY29uc3QgeEVtaXR0ZXIgPSBPYmplY3QuYXNzaWduKG5ldyBFdmVudEVtaXR0ZXIoKSwge1xuICAgICAgICBuYW1lOiBuYW1lICsgJ194JyxcbiAgICAgICAgdHlwZTogaW50ZXJpbVR5cGVzLkFOQUxPRyxcbiAgICAgICAgc291cmNlOiB0aGlzXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHlFbWl0dGVyID0gT2JqZWN0LmFzc2lnbihuZXcgRXZlbnRFbWl0dGVyKCksIHtcbiAgICAgICAgbmFtZTogbmFtZSArICdfeScsXG4gICAgICAgIHR5cGU6IGludGVyaW1UeXBlcy5BTkFMT0csXG4gICAgICAgIHNvdXJjZTogdGhpc1xuICAgICAgfSk7XG4gICAgICB0aGlzW25hbWVdID0ge1xuICAgICAgICB4OiB4RW1pdHRlcixcbiAgICAgICAgeTogeUVtaXR0ZXJcbiAgICAgIH07XG4gICAgICBpbnB1dC5vbignY2hhbmdlJywgKHsgeCwgeSB9KSA9PiB7XG4gICAgICAgIGlmICh0aGlzW2FybWVkXSkge1xuICAgICAgICAgIGxvZ2dlci50cmFjZShgQ29udHJvbGxlciAke3NwZWMubmFtZX0gZW1pdHRlZCBhbmFsb2cgMkQgZGlyZWN0aW9uIHZhbHVlICgke3h9LCAke3l9KWApO1xuICAgICAgICAgIHhFbWl0dGVyLmVtaXQoJ2NoYW5nZScsIHgpO1xuICAgICAgICAgIHlFbWl0dGVyLmVtaXQoJ2NoYW5nZScsIHkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBbaGFuZGxlRGlnaXRhbDJERGlyZWN0aW9uXShuYW1lLCBpbnB1dCkge1xuICAgICAgbG9nZ2VyLmRlYnVnKGBXaXJpbmcgdXAgZGlnaXRhbCAyRCBkaXJlY3Rpb24gZm9yIGNvbnRyb2xsZXIgJHtzcGVjLm5hbWV9YCk7XG4gICAgICBjb25zdCB4RW1pdHRlciA9IE9iamVjdC5hc3NpZ24obmV3IEV2ZW50RW1pdHRlcigpLCB7XG4gICAgICAgIG5hbWU6IG5hbWUgKyAnX3gnLFxuICAgICAgICB0eXBlOiBpbnRlcmltVHlwZXMuQU5BTE9HLFxuICAgICAgICBzb3VyY2U6IHRoaXNcbiAgICAgIH0pO1xuICAgICAgY29uc3QgeUVtaXR0ZXIgPSBPYmplY3QuYXNzaWduKG5ldyBFdmVudEVtaXR0ZXIoKSwge1xuICAgICAgICBuYW1lOiBuYW1lICsgJ195JyxcbiAgICAgICAgdHlwZTogaW50ZXJpbVR5cGVzLkFOQUxPRyxcbiAgICAgICAgc291cmNlOiB0aGlzXG4gICAgICB9KTtcbiAgICAgIHRoaXNbbmFtZV0gPSB7XG4gICAgICAgIHg6IHhFbWl0dGVyLFxuICAgICAgICB5OiB5RW1pdHRlclxuICAgICAgfTtcbiAgICAgIGlucHV0Lm9uKCdjaGFuZ2UnLCAoZGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIGlmICh0aGlzW2FybWVkXSkge1xuICAgICAgICAgIGxvZ2dlci50cmFjZShgQ29udHJvbGxlciAke3NwZWMubmFtZX0gZW1pdHRlZCBkaWdpdGFsIDJEIGRpcmVjdGlvbiB2YWx1ZSAke2RpcmVjdGlvbn1gKTtcbiAgICAgICAgICBjb25zdCB7IHgsIHkgfSA9IGRpcmVjdGlvblRvQXhlcyhkaXJlY3Rpb24pO1xuICAgICAgICAgIHhFbWl0dGVyLmVtaXQoJ2NoYW5nZScsIHgpO1xuICAgICAgICAgIHlFbWl0dGVyLmVtaXQoJ2NoYW5nZScsIHkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBbaGFuZGxlQmluYXJ5U3RhdGVdKG5hbWUsIGlucHV0KSB7XG4gICAgfVxuICB9XG5cbiAgaWYgKHNwZWMuY29uc3RhbnRzKSB7XG4gICAgT2JqZWN0LmFzc2lnbihDb250cm9sbGVyLCBzcGVjLmNvbnN0YW50cyk7XG4gIH1cblxuICByZXR1cm4gQ29udHJvbGxlcjtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==