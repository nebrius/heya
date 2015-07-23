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
      key: handleAnalog1DDirection,
      value: function (name, input) {
        logger.debug("Wiring up analog 1D direction for controller " + spec.name);
        var axisEmitter = Object.assign(new EventEmitter(), {
          name: name,
          type: interimTypes.ANALOG,
          source: this
        });
        this[name] = axisEmitter;
        // TODO: actually wire up
      }
    }, {
      key: handleDigital2DDirection,
      value: function (name, input) {
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
          logger.debug("Controller " + spec.name + " emitted digital 2D direction value " + direction);

          var _directionToAxes = directionToAxes(direction);

          var x = _directionToAxes.x;
          var y = _directionToAxes.y;

          xEmitter.emit("change", x);
          yEmitter.emit("change", y);
        });
      }
    }, {
      key: handleAnalog2DDirection,
      value: function (name, input) {
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
        // TODO: actually wire up
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O1FBeUNnQixnQkFBZ0IsR0FBaEIsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBakJ2QixZQUFZLFdBQVEsUUFBUSxFQUE1QixZQUFZOztJQUNILFlBQVksV0FBUSxpQkFBaUIsRUFBOUMsS0FBSzs7SUFDUCxlQUFlLDJCQUFNLG1EQUFtRDs7SUFDeEUsTUFBTSwyQkFBTSxlQUFlOztBQUUzQixJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2pDLGNBQVksRUFBRSxjQUFjO0FBQzVCLHNCQUFvQixFQUFFLHNCQUFzQjtBQUM1QyxxQkFBbUIsRUFBRSxxQkFBcUI7QUFDMUMscUJBQW1CLEVBQUUscUJBQXFCO0NBQzNDLENBQUMsQ0FBQzs7UUFMVSxLQUFLLEdBQUwsS0FBSztBQU9sQixJQUFNLHdCQUF3QixHQUFHLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3BFLElBQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDbEUsSUFBTSx1QkFBdUIsR0FBRyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUNsRSxJQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOztBQUUvQyxTQUFTLGdCQUFnQixDQUFDLElBQUksRUFBRTtBQUNyQyxNQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLFVBQVUsRUFBRTtBQUM3RSxVQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7R0FDbEQ7QUFDRCxRQUFNLENBQUMsS0FBSywwQkFBd0IsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDOztNQUUzQyxVQUFVO0FBRUgsYUFGUCxVQUFVLEdBRU87d0NBQU4sSUFBSTtBQUFKLFlBQUk7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Q2IsQ0FBQyxDQUFDO0FBQ0gsWUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO0FBQ1gsV0FBQyxFQUFFLFFBQVE7QUFDWCxXQUFDLEVBQUUsUUFBUTtTQUNaLENBQUM7O09BRUg7O1dBRUEsaUJBQWlCO2FBQUMsVUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQ2hDOzs7V0FoR0csVUFBVTtLQUFTLFlBQVk7O0FBbUdyQyxNQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDbEIsVUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQzNDOztBQUVELFNBQU8sVUFBVSxDQUFDO0NBQ25CIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2NvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7IHR5cGVzIGFzIGludGVyaW1UeXBlcyB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgZGlyZWN0aW9uVG9BeGVzIGZyb20gJy4uL2ZpbHRlcnMvZGlyZWN0aW9uX3RvX2F4ZXMvZGlyZWN0aW9uX3RvX2F4ZXMuanMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9sb2dnaW5nLmpzJztcblxuZXhwb3J0IGNvbnN0IHR5cGVzID0gT2JqZWN0LmZyZWV6ZSh7XG4gIEJJTkFSWV9TVEFURTogJ0JJTkFSWV9TVEFURScsXG4gIERJR0lUQUxfMkRfRElSRUNUSU9OOiAnRElHSVRBTF8yRF9ESVJFQ1RJT04nLFxuICBBTkFMT0dfMURfRElSRUNUSU9OOiAnQU5BTE9HXzFEX0RJUkVDVElPTicsXG4gIEFOQUxPR18yRF9ESVJFQ1RJT046ICdBTkFMT0dfMkRfRElSRUNUSU9OJ1xufSk7XG5cbmNvbnN0IGhhbmRsZURpZ2l0YWwyRERpcmVjdGlvbiA9IFN5bWJvbCgnaGFuZGxlRGlnaXRhbDJERGlyZWN0aW9uJyk7XG5jb25zdCBoYW5kbGVBbmFsb2cxRERpcmVjdGlvbiA9IFN5bWJvbCgnaGFuZGxlQW5hbG9nMUREaXJlY3Rpb24nKTtcbmNvbnN0IGhhbmRsZUFuYWxvZzJERGlyZWN0aW9uID0gU3ltYm9sKCdoYW5kbGVBbmFsb2cyRERpcmVjdGlvbicpO1xuY29uc3QgaGFuZGxlQmluYXJ5U3RhdGUgPSBTeW1ib2woJ2hhbmRsZUJpbmFyeVN0YXRlJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKHNwZWMpIHtcbiAgaWYgKHR5cGVvZiBzcGVjLmluaXRpYWxpemUgIT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygc3BlYy5jb25uZWN0ICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29udHJvbGxlciBkZWZpbml0aW9uJyk7XG4gIH1cbiAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBjb250cm9sbGVyICR7c3BlYy5uYW1lfWApO1xuXG4gIGNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoLi4ub3B0cykge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHNwZWMuaW5pdGlhbGl6ZSguLi5vcHRzKTtcblxuICAgICAgdGhpcy50eXBlID0gaW50ZXJpbVR5cGVzLkNPTlRST0xMRVI7XG4gICAgICB0aGlzLmlucHV0cyA9IHt9O1xuICAgICAgdGhpcy5uYW1lID0gc3BlYy5uYW1lO1xuXG4gICAgICBjb25zdCBpbnB1dHMgPSBzcGVjLmlucHV0cztcbiAgICAgIGlmICghaW5wdXRzIHx8IHR5cGVvZiBpbnB1dHMgIT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGlucHV0cyBmb3IgJHtzcGVjLm5hbWUgfHwgJ3VubmFtZWQgY29udHJvbGxlcid9YCk7XG4gICAgICB9XG4gICAgICBsZXQgaW5wdXQ7IC8vIGVzbGludCBhbmQgYmFiZWwgZGlzYWdyZWUgb24gd2hldGhlciB0byB1c2UgbGV0IG9yIGNvbnN0IGlubGluZSBpbiB0aGUgZm9yLi4uaW5cbiAgICAgIGZvciAoaW5wdXQgaW4gaW5wdXRzKSB7XG4gICAgICAgIGlmIChpbnB1dHMuaGFzT3duUHJvcGVydHkoaW5wdXQpKSB7XG4gICAgICAgICAgc3dpdGNoIChpbnB1dHNbaW5wdXRdLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgdHlwZXMuRElHSVRBTF8yRF9ESVJFQ1RJT046XG4gICAgICAgICAgICAgIHRoaXNbaGFuZGxlRGlnaXRhbDJERGlyZWN0aW9uXShpbnB1dCwgaW5wdXRzW2lucHV0XSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5BTkFMT0dfMURfRElSRUNUSU9OOlxuICAgICAgICAgICAgICB0aGlzW2hhbmRsZUFuYWxvZzFERGlyZWN0aW9uXShpbnB1dCwgaW5wdXRzW2lucHV0XSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5BTkFMT0dfMkRfRElSRUNUSU9OOlxuICAgICAgICAgICAgICB0aGlzW2hhbmRsZUFuYWxvZzJERGlyZWN0aW9uXShpbnB1dCwgaW5wdXRzW2lucHV0XSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSB0eXBlcy5CSU5BUllfU1RBVEU6XG4gICAgICAgICAgICAgIHRoaXNbaGFuZGxlQmluYXJ5U3RhdGVdKGlucHV0LCBpbnB1dHNbaW5wdXRdKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY29udHJvbGxlciBpbnB1dCB0eXBlIFwiJHtpbnB1dHNbaW5wdXRdLnR5cGV9XCJgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25uZWN0KGNiKSB7XG4gICAgICBzcGVjLmNvbm5lY3QoY2IpO1xuICAgIH1cblxuICAgIFtoYW5kbGVBbmFsb2cxRERpcmVjdGlvbl0obmFtZSwgaW5wdXQpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgV2lyaW5nIHVwIGFuYWxvZyAxRCBkaXJlY3Rpb24gZm9yIGNvbnRyb2xsZXIgJHtzcGVjLm5hbWV9YCk7XG4gICAgICBjb25zdCBheGlzRW1pdHRlciA9IE9iamVjdC5hc3NpZ24obmV3IEV2ZW50RW1pdHRlcigpLCB7XG4gICAgICAgIG5hbWUsXG4gICAgICAgIHR5cGU6IGludGVyaW1UeXBlcy5BTkFMT0csXG4gICAgICAgIHNvdXJjZTogdGhpc1xuICAgICAgfSk7XG4gICAgICB0aGlzW25hbWVdID0gYXhpc0VtaXR0ZXI7XG4gICAgICAvLyBUT0RPOiBhY3R1YWxseSB3aXJlIHVwXG4gICAgfVxuXG4gICAgW2hhbmRsZURpZ2l0YWwyRERpcmVjdGlvbl0obmFtZSwgaW5wdXQpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgV2lyaW5nIHVwIGRpZ2l0YWwgMkQgZGlyZWN0aW9uIGZvciBjb250cm9sbGVyICR7c3BlYy5uYW1lfWApO1xuICAgICAgY29uc3QgeEVtaXR0ZXIgPSBPYmplY3QuYXNzaWduKG5ldyBFdmVudEVtaXR0ZXIoKSwge1xuICAgICAgICBuYW1lOiBuYW1lICsgJ194JyxcbiAgICAgICAgdHlwZTogaW50ZXJpbVR5cGVzLkFOQUxPRyxcbiAgICAgICAgc291cmNlOiB0aGlzXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHlFbWl0dGVyID0gT2JqZWN0LmFzc2lnbihuZXcgRXZlbnRFbWl0dGVyKCksIHtcbiAgICAgICAgbmFtZTogbmFtZSArICdfeScsXG4gICAgICAgIHR5cGU6IGludGVyaW1UeXBlcy5BTkFMT0csXG4gICAgICAgIHNvdXJjZTogdGhpc1xuICAgICAgfSk7XG4gICAgICB0aGlzW25hbWVdID0ge1xuICAgICAgICB4OiB4RW1pdHRlcixcbiAgICAgICAgeTogeUVtaXR0ZXJcbiAgICAgIH07XG4gICAgICBpbnB1dC5vbignY2hhbmdlJywgKGRpcmVjdGlvbikgPT4ge1xuICAgICAgICBsb2dnZXIuZGVidWcoYENvbnRyb2xsZXIgJHtzcGVjLm5hbWV9IGVtaXR0ZWQgZGlnaXRhbCAyRCBkaXJlY3Rpb24gdmFsdWUgJHtkaXJlY3Rpb259YCk7XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gZGlyZWN0aW9uVG9BeGVzKGRpcmVjdGlvbik7XG4gICAgICAgIHhFbWl0dGVyLmVtaXQoJ2NoYW5nZScsIHgpO1xuICAgICAgICB5RW1pdHRlci5lbWl0KCdjaGFuZ2UnLCB5KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIFtoYW5kbGVBbmFsb2cyRERpcmVjdGlvbl0obmFtZSwgaW5wdXQpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgV2lyaW5nIHVwIGFuYWxvZyAyRCBkaXJlY3Rpb24gZm9yIGNvbnRyb2xsZXIgJHtzcGVjLm5hbWV9YCk7XG4gICAgICBjb25zdCB4RW1pdHRlciA9IE9iamVjdC5hc3NpZ24obmV3IEV2ZW50RW1pdHRlcigpLCB7XG4gICAgICAgIG5hbWU6IG5hbWUgKyAnX3gnLFxuICAgICAgICB0eXBlOiBpbnRlcmltVHlwZXMuQU5BTE9HLFxuICAgICAgICBzb3VyY2U6IHRoaXNcbiAgICAgIH0pO1xuICAgICAgY29uc3QgeUVtaXR0ZXIgPSBPYmplY3QuYXNzaWduKG5ldyBFdmVudEVtaXR0ZXIoKSwge1xuICAgICAgICBuYW1lOiBuYW1lICsgJ195JyxcbiAgICAgICAgdHlwZTogaW50ZXJpbVR5cGVzLkFOQUxPRyxcbiAgICAgICAgc291cmNlOiB0aGlzXG4gICAgICB9KTtcbiAgICAgIHRoaXNbbmFtZV0gPSB7XG4gICAgICAgIHg6IHhFbWl0dGVyLFxuICAgICAgICB5OiB5RW1pdHRlclxuICAgICAgfTtcbiAgICAgIC8vIFRPRE86IGFjdHVhbGx5IHdpcmUgdXBcbiAgICB9XG5cbiAgICBbaGFuZGxlQmluYXJ5U3RhdGVdKG5hbWUsIGlucHV0KSB7XG4gICAgfVxuICB9XG5cbiAgaWYgKHNwZWMuY29uc3RhbnRzKSB7XG4gICAgT2JqZWN0LmFzc2lnbihDb250cm9sbGVyLCBzcGVjLmNvbnN0YW50cyk7XG4gIH1cblxuICByZXR1cm4gQ29udHJvbGxlcjtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==