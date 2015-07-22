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

var directionToAxes = require("../filters/direction_to_axes/direction_to_axes.js").directionToAxes;

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

  return Controller;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O1FBK0JnQixnQkFBZ0IsR0FBaEIsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUHZCLFlBQVksV0FBUSxRQUFRLEVBQTVCLFlBQVk7OzJCQUNhLGlCQUFpQjs7SUFBMUMsS0FBSyxnQkFBTCxLQUFLO0lBQUUsVUFBVSxnQkFBVixVQUFVOztJQUNqQixlQUFlLFdBQVEsbURBQW1ELEVBQTFFLGVBQWU7O0lBQ2pCLE1BQU0sMkJBQU0sZUFBZTs7QUFFbEMsSUFBTSx3QkFBd0IsR0FBRyxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs7QUFFN0QsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7QUFDckMsTUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksVUFBVSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxVQUFVLEVBQUU7QUFDN0UsVUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0dBQ2xEO0FBQ0QsUUFBTSxDQUFDLEtBQUssMEJBQXdCLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQzs7TUFFM0MsVUFBVTtBQUVILGFBRlAsVUFBVSxHQUVPO3dDQUFOLElBQUk7QUFBSixZQUFJOzs7NEJBRmYsVUFBVTs7QUFHWixpQ0FIRSxVQUFVLDZDQUdKO0FBQ1IsVUFBSSxDQUFDLFVBQVUsTUFBQSxDQUFmLElBQUksRUFBZSxJQUFJLENBQUMsQ0FBQzs7QUFFekIsVUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDO0FBQzdCLFVBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLFVBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFFdEIsVUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixVQUFJLENBQUMsTUFBTSxJQUFJLE9BQU8sTUFBTSxJQUFJLFFBQVEsRUFBRTtBQUN4QyxjQUFNLElBQUksS0FBSywwQkFBdUIsSUFBSSxDQUFDLElBQUksSUFBSSxvQkFBb0IsQ0FBQSxDQUFHLENBQUM7T0FDNUU7QUFDRCxVQUFJLEtBQUssWUFBQSxDQUFDO0FBQ1YsV0FBSyxLQUFLLElBQUksTUFBTSxFQUFFO0FBQ3BCLFlBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNoQyxrQkFBUSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSTtBQUN4QixpQkFBSyxVQUFVLENBQUMsb0JBQW9CO0FBQ2xDLGtCQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDckQsb0JBQU07QUFBQSxBQUNSO0FBQ0Usb0JBQU0sSUFBSSxLQUFLLG9DQUFrQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFJLENBQUM7QUFBQSxXQUMzRTtTQUNGO09BQ0Y7S0FDRjs7Y0ExQkcsVUFBVTs7eUJBQVYsVUFBVTs7YUE0QlAsaUJBQUMsRUFBRSxFQUFFO0FBQ1YsWUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztPQUNsQjs7V0FFQSx3QkFBd0I7YUFBQyxVQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7QUFDdEMsY0FBTSxDQUFDLEtBQUssb0RBQWtELElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQztBQUMzRSxZQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksWUFBWSxFQUFFLEVBQUU7QUFDakQsY0FBSSxFQUFFLElBQUksR0FBRyxJQUFJO0FBQ2pCLGNBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtBQUNsQixnQkFBTSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7QUFDSCxZQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksWUFBWSxFQUFFLEVBQUU7QUFDakQsY0FBSSxFQUFFLElBQUksR0FBRyxJQUFJO0FBQ2pCLGNBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtBQUNsQixnQkFBTSxFQUFFLElBQUk7U0FDYixDQUFDLENBQUM7QUFDSCxZQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7QUFDWCxXQUFDLEVBQUUsUUFBUTtBQUNYLFdBQUMsRUFBRSxRQUFRO1NBQ1osQ0FBQztBQUNGLGFBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUMsU0FBUyxFQUFLO0FBQ2hDLGdCQUFNLENBQUMsS0FBSyxpQkFBZSxJQUFJLENBQUMsSUFBSSw0Q0FBdUMsU0FBUyxDQUFHLENBQUM7O2lDQUN2RSxlQUFlLENBQUMsU0FBUyxDQUFDOztjQUFuQyxDQUFDLG9CQUFELENBQUM7Y0FBRSxDQUFDLG9CQUFELENBQUM7O0FBQ1osa0JBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNCLGtCQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM1QixDQUFDLENBQUM7T0FDSjs7O1dBdERHLFVBQVU7S0FBUyxZQUFZOztBQXlEckMsU0FBTyxVQUFVLENBQUM7Q0FDbkIiLCJmaWxlIjoiY29udHJvbGxlcnMvY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE1IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgdHlwZXMsIGlucHV0VHlwZXMgfSBmcm9tICcuLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IHsgZGlyZWN0aW9uVG9BeGVzIH0gZnJvbSAnLi4vZmlsdGVycy9kaXJlY3Rpb25fdG9fYXhlcy9kaXJlY3Rpb25fdG9fYXhlcy5qcyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2xvZ2dpbmcuanMnO1xuXG5jb25zdCBoYW5kbGVEaWdpdGFsMkREaXJlY3Rpb24gPSBTeW1ib2woJ2hhbmRsZURpZ2l0YWwyRERpcmVjdGlvbicpO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29udHJvbGxlcihzcGVjKSB7XG4gIGlmICh0eXBlb2Ygc3BlYy5pbml0aWFsaXplICE9ICdmdW5jdGlvbicgfHwgdHlwZW9mIHNwZWMuY29ubmVjdCAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvbnRyb2xsZXIgZGVmaW5pdGlvbicpO1xuICB9XG4gIGxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgY29udHJvbGxlciAke3NwZWMubmFtZX1gKTtcblxuICBjbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKC4uLm9wdHMpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICBzcGVjLmluaXRpYWxpemUoLi4ub3B0cyk7XG5cbiAgICAgIHRoaXMudHlwZSA9IHR5cGVzLkNPTlRST0xMRVI7XG4gICAgICB0aGlzLmlucHV0cyA9IHt9O1xuICAgICAgdGhpcy5uYW1lID0gc3BlYy5uYW1lO1xuXG4gICAgICBjb25zdCBpbnB1dHMgPSBzcGVjLmlucHV0cztcbiAgICAgIGlmICghaW5wdXRzIHx8IHR5cGVvZiBpbnB1dHMgIT0gJ29iamVjdCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGlucHV0cyBmb3IgJHtzcGVjLm5hbWUgfHwgJ3VubmFtZWQgY29udHJvbGxlcid9YCk7XG4gICAgICB9XG4gICAgICBsZXQgaW5wdXQ7IC8vIGVzbGludCBhbmQgYmFiZWwgZGlzYWdyZWUgb24gd2hldGhlciB0byB1c2UgbGV0IG9yIGNvbnN0IGlubGluZSBpbiB0aGUgZm9yLi4uaW5cbiAgICAgIGZvciAoaW5wdXQgaW4gaW5wdXRzKSB7XG4gICAgICAgIGlmIChpbnB1dHMuaGFzT3duUHJvcGVydHkoaW5wdXQpKSB7XG4gICAgICAgICAgc3dpdGNoIChpbnB1dHNbaW5wdXRdLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgaW5wdXRUeXBlcy5ESUdJVEFMXzJEX0RJUkVDVElPTjpcbiAgICAgICAgICAgICAgdGhpc1toYW5kbGVEaWdpdGFsMkREaXJlY3Rpb25dKGlucHV0LCBpbnB1dHNbaW5wdXRdKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gY29udHJvbGxlciBpbnB1dCB0eXBlICR7aW5wdXRzW2lucHV0XS50eXBlfVwiYCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29ubmVjdChjYikge1xuICAgICAgc3BlYy5jb25uZWN0KGNiKTtcbiAgICB9XG5cbiAgICBbaGFuZGxlRGlnaXRhbDJERGlyZWN0aW9uXShuYW1lLCBpbnB1dCkge1xuICAgICAgbG9nZ2VyLmRlYnVnKGBXaXJpbmcgdXAgZGlnaXRhbCAyRCBkaXJlY3Rpb24gZm9yIGNvbnRyb2xsZXIgJHtzcGVjLm5hbWV9YCk7XG4gICAgICBjb25zdCB4RW1pdHRlciA9IE9iamVjdC5hc3NpZ24obmV3IEV2ZW50RW1pdHRlcigpLCB7XG4gICAgICAgIG5hbWU6IG5hbWUgKyAnX3gnLFxuICAgICAgICB0eXBlOiB0eXBlcy5BTkFMT0csXG4gICAgICAgIHNvdXJjZTogdGhpc1xuICAgICAgfSk7XG4gICAgICBjb25zdCB5RW1pdHRlciA9IE9iamVjdC5hc3NpZ24obmV3IEV2ZW50RW1pdHRlcigpLCB7XG4gICAgICAgIG5hbWU6IG5hbWUgKyAnX3knLFxuICAgICAgICB0eXBlOiB0eXBlcy5BTkFMT0csXG4gICAgICAgIHNvdXJjZTogdGhpc1xuICAgICAgfSk7XG4gICAgICB0aGlzW25hbWVdID0ge1xuICAgICAgICB4OiB4RW1pdHRlcixcbiAgICAgICAgeTogeUVtaXR0ZXJcbiAgICAgIH07XG4gICAgICBpbnB1dC5vbignY2hhbmdlJywgKGRpcmVjdGlvbikgPT4ge1xuICAgICAgICBsb2dnZXIuZGVidWcoYENvbnRyb2xsZXIgJHtzcGVjLm5hbWV9IGVtaXR0ZWQgZGlnaXRhbCAyRCBkaXJlY3Rpb24gdmFsdWUgJHtkaXJlY3Rpb259YCk7XG4gICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gZGlyZWN0aW9uVG9BeGVzKGRpcmVjdGlvbik7XG4gICAgICAgIHhFbWl0dGVyLmVtaXQoJ2NoYW5nZScsIHgpO1xuICAgICAgICB5RW1pdHRlci5lbWl0KCdjaGFuZ2UnLCB5KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBDb250cm9sbGVyO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9