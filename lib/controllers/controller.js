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

var _constantsJs = require("../constants.js");

var types = _constantsJs.types;
var inputTypes = _constantsJs.inputTypes;

var directionToAxes = _interopRequire(require("../filters/direction_to_axes/direction_to_axes.js"));

var logger = _interopRequire(require("../logging.js"));

var handleDigital2DDirection = Symbol("handleDigital2DDirection");

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

      this.type = types.CONTROLLER;
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
            case inputTypes.DIGITAL_2D_DIRECTION:
              this[handleDigital2DDirection](input, inputs[input]);
              break;
            default:
              throw new Error("Unknown controller input type " + inputs[input].type + "\"");
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
      key: handleDigital2DDirection,
      value: function (name, input) {
        logger.debug("Wiring up digital 2D direction for controller " + spec.name);
        var xEmitter = Object.assign(new EventEmitter(), {
          name: name + "_x",
          type: types.ANALOG,
          source: this
        });
        var yEmitter = Object.assign(new EventEmitter(), {
          name: name + "_y",
          type: types.ANALOG,
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
    }]);

    return Controller;
  })(EventEmitter);

  if (spec.constants) {
    Object.assign(Controller, spec.constants);
  }

  return Controller;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O1FBK0JnQixnQkFBZ0IsR0FBaEIsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUHZCLFlBQVksV0FBUSxRQUFRLEVBQTVCLFlBQVk7OzJCQUNhLGlCQUFpQjs7SUFBMUMsS0FBSyxnQkFBTCxLQUFLO0lBQUUsVUFBVSxnQkFBVixVQUFVOztJQUNuQixlQUFlLDJCQUFNLG1EQUFtRDs7SUFDeEUsTUFBTSwyQkFBTSxlQUFlOztBQUVsQyxJQUFNLHdCQUF3QixHQUFHLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDOztBQUU3RCxTQUFTLGdCQUFnQixDQUFDLElBQUksRUFBRTtBQUNyQyxNQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLFVBQVUsRUFBRTtBQUM3RSxVQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7R0FDbEQ7QUFDRCxRQUFNLENBQUMsS0FBSywwQkFBd0IsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDOztNQUUzQyxVQUFVO0FBRUgsYUFGUCxVQUFVLEdBRU87d0NBQU4sSUFBSTtBQUFKLFlBQUk7Ozs0QkFGZixVQUFVOztBQUdaLGlDQUhFLFVBQVUsNkNBR0o7QUFDUixVQUFJLENBQUMsVUFBVSxNQUFBLENBQWYsSUFBSSxFQUFlLElBQUksQ0FBQyxDQUFDOztBQUV6QixVQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7QUFDN0IsVUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDakIsVUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOztBQUV0QixVQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLFVBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLElBQUksUUFBUSxFQUFFO0FBQ3hDLGNBQU0sSUFBSSxLQUFLLDBCQUF1QixJQUFJLENBQUMsSUFBSSxJQUFJLG9CQUFvQixDQUFBLENBQUcsQ0FBQztPQUM1RTtBQUNELFVBQUksS0FBSyxZQUFBLENBQUM7QUFDVixXQUFLLEtBQUssSUFBSSxNQUFNLEVBQUU7QUFDcEIsWUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2hDLGtCQUFRLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJO0FBQ3hCLGlCQUFLLFVBQVUsQ0FBQyxvQkFBb0I7QUFDbEMsa0JBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNyRCxvQkFBTTtBQUFBLEFBQ1I7QUFDRSxvQkFBTSxJQUFJLEtBQUssb0NBQWtDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQUksQ0FBQztBQUFBLFdBQzNFO1NBQ0Y7T0FDRjtLQUNGOztjQTFCRyxVQUFVOzt5QkFBVixVQUFVOzthQTRCUCxpQkFBQyxFQUFFLEVBQUU7QUFDVixZQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQ2xCOztXQUVBLHdCQUF3QjthQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUN0QyxjQUFNLENBQUMsS0FBSyxvREFBa0QsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDO0FBQzNFLFlBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFZLEVBQUUsRUFBRTtBQUNqRCxjQUFJLEVBQUUsSUFBSSxHQUFHLElBQUk7QUFDakIsY0FBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ2xCLGdCQUFNLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztBQUNILFlBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFZLEVBQUUsRUFBRTtBQUNqRCxjQUFJLEVBQUUsSUFBSSxHQUFHLElBQUk7QUFDakIsY0FBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ2xCLGdCQUFNLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztBQUNILFlBQUksQ0FBQyxJQUFJLENBQUMsR0FBRztBQUNYLFdBQUMsRUFBRSxRQUFRO0FBQ1gsV0FBQyxFQUFFLFFBQVE7U0FDWixDQUFDO0FBQ0YsYUFBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQyxTQUFTLEVBQUs7QUFDaEMsZ0JBQU0sQ0FBQyxLQUFLLGlCQUFlLElBQUksQ0FBQyxJQUFJLDRDQUF1QyxTQUFTLENBQUcsQ0FBQzs7aUNBQ3ZFLGVBQWUsQ0FBQyxTQUFTLENBQUM7O2NBQW5DLENBQUMsb0JBQUQsQ0FBQztjQUFFLENBQUMsb0JBQUQsQ0FBQzs7QUFDWixrQkFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDM0Isa0JBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzVCLENBQUMsQ0FBQztPQUNKOzs7V0F0REcsVUFBVTtLQUFTLFlBQVk7O0FBeURyQyxNQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDbEIsVUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQzNDOztBQUVELFNBQU8sVUFBVSxDQUFDO0NBQ25CIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2NvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7IHR5cGVzLCBpbnB1dFR5cGVzIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCBkaXJlY3Rpb25Ub0F4ZXMgZnJvbSAnLi4vZmlsdGVycy9kaXJlY3Rpb25fdG9fYXhlcy9kaXJlY3Rpb25fdG9fYXhlcy5qcyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2xvZ2dpbmcuanMnO1xuXG5jb25zdCBoYW5kbGVEaWdpdGFsMkREaXJlY3Rpb24gPSBTeW1ib2woJ2hhbmRsZURpZ2l0YWwyRERpcmVjdGlvbicpO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihzcGVjKSB7XG4gIGlmICh0eXBlb2Ygc3BlYy5pbml0aWFsaXplICE9ICdmdW5jdGlvbicgfHwgdHlwZW9mIHNwZWMuY29ubmVjdCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvbnRyb2xsZXIgZGVmaW5pdGlvbicpO1xuICB9XG4gIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgY29udHJvbGxlciAke3NwZWMubmFtZX1gKTtcblxuICBjbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKC4uLm9wdHMpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICBzcGVjLmluaXRpYWxpemUoLi4ub3B0cyk7XG5cbiAgICAgIHRoaXMudHlwZSA9IHR5cGVzLkNPTlRST0xMRVI7XG4gICAgICB0aGlzLmlucHV0cyA9IHt9O1xuICAgICAgdGhpcy5uYW1lID0gc3BlYy5uYW1lO1xuXG4gICAgICBjb25zdCBpbnB1dHMgPSBzcGVjLmlucHV0cztcbiAgICAgIGlmICghaW5wdXRzIHx8IHR5cGVvZiBpbnB1dHMgIT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGlucHV0cyBmb3IgJHtzcGVjLm5hbWUgfHwgJ3VubmFtZWQgY29udHJvbGxlcid9YCk7XG4gICAgICB9XG4gICAgICBsZXQgaW5wdXQ7IC8vIGVzbGludCBhbmQgYmFiZWwgZGlzYWdyZWUgb24gd2hldGhlciB0byB1c2UgbGV0IG9yIGNvbnN0IGlubGluZSBpbiB0aGUgZm9yLi4uaW5cbiAgICAgIGZvciAoaW5wdXQgaW4gaW5wdXRzKSB7XG4gICAgICAgIGlmIChpbnB1dHMuaGFzT3duUHJvcGVydHkoaW5wdXQpKSB7XG4gICAgICAgICAgc3dpdGNoIChpbnB1dHNbaW5wdXRdLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgaW5wdXRUeXBlcy5ESUdJVEFMXzJEX0RJUkVDVElPTjpcbiAgICAgICAgICAgICAgdGhpc1toYW5kbGVEaWdpdGFsMkREaXJlY3Rpb25dKGlucHV0LCBpbnB1dHNbaW5wdXRdKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY29udHJvbGxlciBpbnB1dCB0eXBlICR7aW5wdXRzW2lucHV0XS50eXBlfVwiYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29ubmVjdChjYikge1xuICAgICAgc3BlYy5jb25uZWN0KGNiKTtcbiAgICB9XG5cbiAgICBbaGFuZGxlRGlnaXRhbDJERGlyZWN0aW9uXShuYW1lLCBpbnB1dCkge1xuICAgICAgbG9nZ2VyLmRlYnVnKGBXaXJpbmcgdXAgZGlnaXRhbCAyRCBkaXJlY3Rpb24gZm9yIGNvbnRyb2xsZXIgJHtzcGVjLm5hbWV9YCk7XG4gICAgICBjb25zdCB4RW1pdHRlciA9IE9iamVjdC5hc3NpZ24obmV3IEV2ZW50RW1pdHRlcigpLCB7XG4gICAgICAgIG5hbWU6IG5hbWUgKyAnX3gnLFxuICAgICAgICB0eXBlOiB0eXBlcy5BTkFMT0csXG4gICAgICAgIHNvdXJjZTogdGhpc1xuICAgICAgfSk7XG4gICAgICBjb25zdCB5RW1pdHRlciA9IE9iamVjdC5hc3NpZ24obmV3IEV2ZW50RW1pdHRlcigpLCB7XG4gICAgICAgIG5hbWU6IG5hbWUgKyAnX3knLFxuICAgICAgICB0eXBlOiB0eXBlcy5BTkFMT0csXG4gICAgICAgIHNvdXJjZTogdGhpc1xuICAgICAgfSk7XG4gICAgICB0aGlzW25hbWVdID0ge1xuICAgICAgICB4OiB4RW1pdHRlcixcbiAgICAgICAgeTogeUVtaXR0ZXJcbiAgICAgIH07XG4gICAgICBpbnB1dC5vbignY2hhbmdlJywgKGRpcmVjdGlvbikgPT4ge1xuICAgICAgICBsb2dnZXIuZGVidWcoYENvbnRyb2xsZXIgJHtzcGVjLm5hbWV9IGVtaXR0ZWQgZGlnaXRhbCAyRCBkaXJlY3Rpb24gdmFsdWUgJHtkaXJlY3Rpb259YCk7XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gZGlyZWN0aW9uVG9BeGVzKGRpcmVjdGlvbik7XG4gICAgICAgIHhFbWl0dGVyLmVtaXQoJ2NoYW5nZScsIHgpO1xuICAgICAgICB5RW1pdHRlci5lbWl0KCdjaGFuZ2UnLCB5KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzcGVjLmNvbnN0YW50cykge1xuICAgIE9iamVjdC5hc3NpZ24oQ29udHJvbGxlciwgc3BlYy5jb25zdGFudHMpO1xuICB9XG5cbiAgcmV0dXJuIENvbnRyb2xsZXI7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=