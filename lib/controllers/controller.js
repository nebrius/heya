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

    // Initializes the controller. This calls the definition's initialization
    // method, which is supposed to create the inputs object

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
              this[handleDigital2DDirection](input, inputs[input], spec);
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
      value: function connect() {
        spec.connect();
      }
    }, {
      key: handleDigital2DDirection,
      value: function (name, input, spec) {
        var _this = this;

        logger.debug("Wiring up digital 2D direction for controller " + spec.name);
        this.inputs[name] = {
          x: {
            name: name + "_x",
            type: types.ANALOG,
            source: this
          },
          y: {
            name: name + "_y",
            type: types.ANALOG,
            source: this
          }
        };
        input.on("change", function (direction) {
          logger.debug("Digital 2D direction value changed to " + direction + " from controller " + spec.name);

          var _directionToAxes = directionToAxes(direction);

          var x = _directionToAxes.x;
          var y = _directionToAxes.y;

          _this.emit("change", [{
            source: name + "_x",
            value: x
          }, {
            source: name + "_y",
            value: y
          }]);
        });
      }
    }]);

    return Controller;
  })(EventEmitter);

  return Controller;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O1FBK0JnQixnQkFBZ0IsR0FBaEIsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUHZCLFlBQVksV0FBUSxRQUFRLEVBQTVCLFlBQVk7OzJCQUNhLGlCQUFpQjs7SUFBMUMsS0FBSyxnQkFBTCxLQUFLO0lBQUUsVUFBVSxnQkFBVixVQUFVOztJQUNqQixlQUFlLFdBQVEsbURBQW1ELEVBQTFFLGVBQWU7O0lBQ2pCLE1BQU0sMkJBQU0sZUFBZTs7QUFFbEMsSUFBTSx3QkFBd0IsR0FBRyxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs7QUFFN0QsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7QUFDckMsTUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksVUFBVSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxVQUFVLEVBQUU7QUFDN0UsVUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0dBQ2xEO0FBQ0QsUUFBTSxDQUFDLEtBQUssMEJBQXdCLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQzs7TUFFM0MsVUFBVTs7Ozs7QUFJSCxhQUpQLFVBQVUsR0FJTzt3Q0FBTixJQUFJO0FBQUosWUFBSTs7OzRCQUpmLFVBQVU7O0FBS1osaUNBTEUsVUFBVSw2Q0FLSjtBQUNSLFVBQUksQ0FBQyxVQUFVLE1BQUEsQ0FBZixJQUFJLEVBQWUsSUFBSSxDQUFDLENBQUM7O0FBRXpCLFVBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztBQUM3QixVQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNqQixVQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7O0FBRXRCLFVBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDM0IsVUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLEVBQUU7QUFDeEMsY0FBTSxJQUFJLEtBQUssMEJBQXVCLElBQUksQ0FBQyxJQUFJLElBQUksb0JBQW9CLENBQUEsQ0FBRyxDQUFDO09BQzVFO0FBQ0QsVUFBSSxLQUFLLFlBQUEsQ0FBQztBQUNWLFdBQUssS0FBSyxJQUFJLE1BQU0sRUFBRTtBQUNwQixZQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDaEMsa0JBQVEsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUk7QUFDeEIsaUJBQUssVUFBVSxDQUFDLG9CQUFvQjtBQUNsQyxrQkFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzRCxvQkFBTTtBQUFBLEFBQ1I7QUFDRSxvQkFBTSxJQUFJLEtBQUssb0NBQWtDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQUksQ0FBQztBQUFBLFdBQzNFO1NBQ0Y7T0FDRjtLQUNGOztjQTVCRyxVQUFVOzt5QkFBVixVQUFVOzthQThCUCxtQkFBRztBQUNSLFlBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztPQUNoQjs7V0FFQSx3QkFBd0I7YUFBQyxVQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFOzs7QUFDNUMsY0FBTSxDQUFDLEtBQUssb0RBQWtELElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQztBQUMzRSxZQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHO0FBQ2xCLFdBQUMsRUFBRTtBQUNELGdCQUFJLEVBQUUsSUFBSSxHQUFHLElBQUk7QUFDakIsZ0JBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtBQUNsQixrQkFBTSxFQUFFLElBQUk7V0FDYjtBQUNELFdBQUMsRUFBRTtBQUNELGdCQUFJLEVBQUUsSUFBSSxHQUFHLElBQUk7QUFDakIsZ0JBQUksRUFBRSxLQUFLLENBQUMsTUFBTTtBQUNsQixrQkFBTSxFQUFFLElBQUk7V0FDYjtTQUNGLENBQUM7QUFDRixhQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFDLFNBQVMsRUFBSztBQUNoQyxnQkFBTSxDQUFDLEtBQUssNENBQTBDLFNBQVMseUJBQW9CLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQzs7aUNBQy9FLGVBQWUsQ0FBQyxTQUFTLENBQUM7O2NBQW5DLENBQUMsb0JBQUQsQ0FBQztjQUFFLENBQUMsb0JBQUQsQ0FBQzs7QUFDWixnQkFBSyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbkIsa0JBQU0sRUFBRSxJQUFJLEdBQUcsSUFBSTtBQUNuQixpQkFBSyxFQUFFLENBQUM7V0FDVCxFQUFFO0FBQ0Qsa0JBQU0sRUFBRSxJQUFJLEdBQUcsSUFBSTtBQUNuQixpQkFBSyxFQUFFLENBQUM7V0FDVCxDQUFDLENBQUMsQ0FBQztTQUNMLENBQUMsQ0FBQztPQUNKOzs7V0EzREcsVUFBVTtLQUFTLFlBQVk7O0FBOERyQyxTQUFPLFVBQVUsQ0FBQztDQUNuQiIsImZpbGUiOiJjb250cm9sbGVycy9jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTUgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgeyB0eXBlcywgaW5wdXRUeXBlcyB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgeyBkaXJlY3Rpb25Ub0F4ZXMgfSBmcm9tICcuLi9maWx0ZXJzL2RpcmVjdGlvbl90b19heGVzL2RpcmVjdGlvbl90b19heGVzLmpzJztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi4vbG9nZ2luZy5qcyc7XG5cbmNvbnN0IGhhbmRsZURpZ2l0YWwyRERpcmVjdGlvbiA9IFN5bWJvbCgnaGFuZGxlRGlnaXRhbDJERGlyZWN0aW9uJyk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb250cm9sbGVyKHNwZWMpIHtcbiAgaWYgKHR5cGVvZiBzcGVjLmluaXRpYWxpemUgIT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2Ygc3BlYy5jb25uZWN0ICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29udHJvbGxlciBkZWZpbml0aW9uJyk7XG4gIH1cbiAgbG9nZ2VyLmRlYnVnKGBDcmVhdGluZyBjb250cm9sbGVyICR7c3BlYy5uYW1lfWApO1xuXG4gIGNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgLy8gSW5pdGlhbGl6ZXMgdGhlIGNvbnRyb2xsZXIuIFRoaXMgY2FsbHMgdGhlIGRlZmluaXRpb24ncyBpbml0aWFsaXphdGlvblxuICAgIC8vIG1ldGhvZCwgd2hpY2ggaXMgc3VwcG9zZWQgdG8gY3JlYXRlIHRoZSBpbnB1dHMgb2JqZWN0XG4gICAgY29uc3RydWN0b3IoLi4ub3B0cykge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHNwZWMuaW5pdGlhbGl6ZSguLi5vcHRzKTtcblxuICAgICAgdGhpcy50eXBlID0gdHlwZXMuQ09OVFJPTExFUjtcbiAgICAgIHRoaXMuaW5wdXRzID0ge307XG4gICAgICB0aGlzLm5hbWUgPSBzcGVjLm5hbWU7XG5cbiAgICAgIGNvbnN0IGlucHV0cyA9IHNwZWMuaW5wdXRzO1xuICAgICAgaWYgKCFpbnB1dHMgfHwgdHlwZW9mIGlucHV0cyAhPSAnb2JqZWN0Jykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaW5wdXRzIGZvciAke3NwZWMubmFtZSB8fCAndW5uYW1lZCBjb250cm9sbGVyJ31gKTtcbiAgICAgIH1cbiAgICAgIGxldCBpbnB1dDsgLy8gZXNsaW50IGFuZCBiYWJlbCBkaXNhZ3JlZSBvbiB3aGV0aGVyIHRvIHVzZSBsZXQgb3IgY29uc3QgaW5saW5lIGluIHRoZSBmb3IuLi5pblxuICAgICAgZm9yIChpbnB1dCBpbiBpbnB1dHMpIHtcbiAgICAgICAgaWYgKGlucHV0cy5oYXNPd25Qcm9wZXJ0eShpbnB1dCkpIHtcbiAgICAgICAgICBzd2l0Y2ggKGlucHV0c1tpbnB1dF0udHlwZSkge1xuICAgICAgICAgICAgY2FzZSBpbnB1dFR5cGVzLkRJR0lUQUxfMkRfRElSRUNUSU9OOlxuICAgICAgICAgICAgICB0aGlzW2hhbmRsZURpZ2l0YWwyRERpcmVjdGlvbl0oaW5wdXQsIGlucHV0c1tpbnB1dF0sIHNwZWMpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBjb250cm9sbGVyIGlucHV0IHR5cGUgJHtpbnB1dHNbaW5wdXRdLnR5cGV9XCJgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25uZWN0KCkge1xuICAgICAgc3BlYy5jb25uZWN0KCk7XG4gICAgfVxuXG4gICAgW2hhbmRsZURpZ2l0YWwyRERpcmVjdGlvbl0obmFtZSwgaW5wdXQsIHNwZWMpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgV2lyaW5nIHVwIGRpZ2l0YWwgMkQgZGlyZWN0aW9uIGZvciBjb250cm9sbGVyICR7c3BlYy5uYW1lfWApO1xuICAgICAgdGhpcy5pbnB1dHNbbmFtZV0gPSB7XG4gICAgICAgIHg6IHtcbiAgICAgICAgICBuYW1lOiBuYW1lICsgJ194JyxcbiAgICAgICAgICB0eXBlOiB0eXBlcy5BTkFMT0csXG4gICAgICAgICAgc291cmNlOiB0aGlzXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHtcbiAgICAgICAgICBuYW1lOiBuYW1lICsgJ195JyxcbiAgICAgICAgICB0eXBlOiB0eXBlcy5BTkFMT0csXG4gICAgICAgICAgc291cmNlOiB0aGlzXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpbnB1dC5vbignY2hhbmdlJywgKGRpcmVjdGlvbikgPT4ge1xuICAgICAgICBsb2dnZXIuZGVidWcoYERpZ2l0YWwgMkQgZGlyZWN0aW9uIHZhbHVlIGNoYW5nZWQgdG8gJHtkaXJlY3Rpb259IGZyb20gY29udHJvbGxlciAke3NwZWMubmFtZX1gKTtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBkaXJlY3Rpb25Ub0F4ZXMoZGlyZWN0aW9uKTtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBbe1xuICAgICAgICAgIHNvdXJjZTogbmFtZSArICdfeCcsXG4gICAgICAgICAgdmFsdWU6IHhcbiAgICAgICAgfSwge1xuICAgICAgICAgIHNvdXJjZTogbmFtZSArICdfeScsXG4gICAgICAgICAgdmFsdWU6IHlcbiAgICAgICAgfV0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIENvbnRyb2xsZXI7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=