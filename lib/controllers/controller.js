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
      value: function connect(cb) {
        spec.connect(cb);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O1FBK0JnQixnQkFBZ0IsR0FBaEIsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUHZCLFlBQVksV0FBUSxRQUFRLEVBQTVCLFlBQVk7OzJCQUNhLGlCQUFpQjs7SUFBMUMsS0FBSyxnQkFBTCxLQUFLO0lBQUUsVUFBVSxnQkFBVixVQUFVOztJQUNqQixlQUFlLFdBQVEsbURBQW1ELEVBQTFFLGVBQWU7O0lBQ2pCLE1BQU0sMkJBQU0sZUFBZTs7QUFFbEMsSUFBTSx3QkFBd0IsR0FBRyxNQUFNLENBQUMsMEJBQTBCLENBQUMsQ0FBQzs7QUFFN0QsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUU7QUFDckMsTUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksVUFBVSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sSUFBSSxVQUFVLEVBQUU7QUFDN0UsVUFBTSxJQUFJLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0dBQ2xEO0FBQ0QsUUFBTSxDQUFDLEtBQUssMEJBQXdCLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQzs7TUFFM0MsVUFBVTs7Ozs7QUFJSCxhQUpQLFVBQVUsR0FJTzt3Q0FBTixJQUFJO0FBQUosWUFBSTs7OzRCQUpmLFVBQVU7O0FBS1osaUNBTEUsVUFBVSw2Q0FLSjtBQUNSLFVBQUksQ0FBQyxVQUFVLE1BQUEsQ0FBZixJQUFJLEVBQWUsSUFBSSxDQUFDLENBQUM7O0FBRXpCLFVBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQztBQUM3QixVQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNqQixVQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7O0FBRXRCLFVBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDM0IsVUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLE1BQU0sSUFBSSxRQUFRLEVBQUU7QUFDeEMsY0FBTSxJQUFJLEtBQUssMEJBQXVCLElBQUksQ0FBQyxJQUFJLElBQUksb0JBQW9CLENBQUEsQ0FBRyxDQUFDO09BQzVFO0FBQ0QsVUFBSSxLQUFLLFlBQUEsQ0FBQztBQUNWLFdBQUssS0FBSyxJQUFJLE1BQU0sRUFBRTtBQUNwQixZQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDaEMsa0JBQVEsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUk7QUFDeEIsaUJBQUssVUFBVSxDQUFDLG9CQUFvQjtBQUNsQyxrQkFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzRCxvQkFBTTtBQUFBLEFBQ1I7QUFDRSxvQkFBTSxJQUFJLEtBQUssb0NBQWtDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQUksQ0FBQztBQUFBLFdBQzNFO1NBQ0Y7T0FDRjtLQUNGOztjQTVCRyxVQUFVOzt5QkFBVixVQUFVOzthQThCUCxpQkFBQyxFQUFFLEVBQUU7QUFDVixZQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQ2xCOztXQUVBLHdCQUF3QjthQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7OztBQUM1QyxjQUFNLENBQUMsS0FBSyxvREFBa0QsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDO0FBQzNFLFlBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUc7QUFDbEIsV0FBQyxFQUFFO0FBQ0QsZ0JBQUksRUFBRSxJQUFJLEdBQUcsSUFBSTtBQUNqQixnQkFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ2xCLGtCQUFNLEVBQUUsSUFBSTtXQUNiO0FBQ0QsV0FBQyxFQUFFO0FBQ0QsZ0JBQUksRUFBRSxJQUFJLEdBQUcsSUFBSTtBQUNqQixnQkFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ2xCLGtCQUFNLEVBQUUsSUFBSTtXQUNiO1NBQ0YsQ0FBQztBQUNGLGFBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUMsU0FBUyxFQUFLO0FBQ2hDLGdCQUFNLENBQUMsS0FBSyw0Q0FBMEMsU0FBUyx5QkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDOztpQ0FDL0UsZUFBZSxDQUFDLFNBQVMsQ0FBQzs7Y0FBbkMsQ0FBQyxvQkFBRCxDQUFDO2NBQUUsQ0FBQyxvQkFBRCxDQUFDOztBQUNaLGdCQUFLLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNuQixrQkFBTSxFQUFFLElBQUksR0FBRyxJQUFJO0FBQ25CLGlCQUFLLEVBQUUsQ0FBQztXQUNULEVBQUU7QUFDRCxrQkFBTSxFQUFFLElBQUksR0FBRyxJQUFJO0FBQ25CLGlCQUFLLEVBQUUsQ0FBQztXQUNULENBQUMsQ0FBQyxDQUFDO1NBQ0wsQ0FBQyxDQUFDO09BQ0o7OztXQTNERyxVQUFVO0tBQVMsWUFBWTs7QUE4RHJDLFNBQU8sVUFBVSxDQUFDO0NBQ25CIiwiZmlsZSI6ImNvbnRyb2xsZXJzL2NvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7IHR5cGVzLCBpbnB1dFR5cGVzIH0gZnJvbSAnLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGRpcmVjdGlvblRvQXhlcyB9IGZyb20gJy4uL2ZpbHRlcnMvZGlyZWN0aW9uX3RvX2F4ZXMvZGlyZWN0aW9uX3RvX2F4ZXMuanMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9sb2dnaW5nLmpzJztcblxuY29uc3QgaGFuZGxlRGlnaXRhbDJERGlyZWN0aW9uID0gU3ltYm9sKCdoYW5kbGVEaWdpdGFsMkREaXJlY3Rpb24nKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoc3BlYykge1xuICBpZiAodHlwZW9mIHNwZWMuaW5pdGlhbGl6ZSAhPSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBzcGVjLmNvbm5lY3QgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb250cm9sbGVyIGRlZmluaXRpb24nKTtcbiAgfVxuICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIGNvbnRyb2xsZXIgJHtzcGVjLm5hbWV9YCk7XG5cbiAgY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICAvLyBJbml0aWFsaXplcyB0aGUgY29udHJvbGxlci4gVGhpcyBjYWxscyB0aGUgZGVmaW5pdGlvbidzIGluaXRpYWxpemF0aW9uXG4gICAgLy8gbWV0aG9kLCB3aGljaCBpcyBzdXBwb3NlZCB0byBjcmVhdGUgdGhlIGlucHV0cyBvYmplY3RcbiAgICBjb25zdHJ1Y3RvciguLi5vcHRzKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgc3BlYy5pbml0aWFsaXplKC4uLm9wdHMpO1xuXG4gICAgICB0aGlzLnR5cGUgPSB0eXBlcy5DT05UUk9MTEVSO1xuICAgICAgdGhpcy5pbnB1dHMgPSB7fTtcbiAgICAgIHRoaXMubmFtZSA9IHNwZWMubmFtZTtcblxuICAgICAgY29uc3QgaW5wdXRzID0gc3BlYy5pbnB1dHM7XG4gICAgICBpZiAoIWlucHV0cyB8fCB0eXBlb2YgaW5wdXRzICE9ICdvYmplY3QnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnB1dHMgZm9yICR7c3BlYy5uYW1lIHx8ICd1bm5hbWVkIGNvbnRyb2xsZXInfWApO1xuICAgICAgfVxuICAgICAgbGV0IGlucHV0OyAvLyBlc2xpbnQgYW5kIGJhYmVsIGRpc2FncmVlIG9uIHdoZXRoZXIgdG8gdXNlIGxldCBvciBjb25zdCBpbmxpbmUgaW4gdGhlIGZvci4uLmluXG4gICAgICBmb3IgKGlucHV0IGluIGlucHV0cykge1xuICAgICAgICBpZiAoaW5wdXRzLmhhc093blByb3BlcnR5KGlucHV0KSkge1xuICAgICAgICAgIHN3aXRjaCAoaW5wdXRzW2lucHV0XS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIGlucHV0VHlwZXMuRElHSVRBTF8yRF9ESVJFQ1RJT046XG4gICAgICAgICAgICAgIHRoaXNbaGFuZGxlRGlnaXRhbDJERGlyZWN0aW9uXShpbnB1dCwgaW5wdXRzW2lucHV0XSwgc3BlYyk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGNvbnRyb2xsZXIgaW5wdXQgdHlwZSAke2lucHV0c1tpbnB1dF0udHlwZX1cImApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbm5lY3QoY2IpIHtcbiAgICAgIHNwZWMuY29ubmVjdChjYik7XG4gICAgfVxuXG4gICAgW2hhbmRsZURpZ2l0YWwyRERpcmVjdGlvbl0obmFtZSwgaW5wdXQsIHNwZWMpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgV2lyaW5nIHVwIGRpZ2l0YWwgMkQgZGlyZWN0aW9uIGZvciBjb250cm9sbGVyICR7c3BlYy5uYW1lfWApO1xuICAgICAgdGhpcy5pbnB1dHNbbmFtZV0gPSB7XG4gICAgICAgIHg6IHtcbiAgICAgICAgICBuYW1lOiBuYW1lICsgJ194JyxcbiAgICAgICAgICB0eXBlOiB0eXBlcy5BTkFMT0csXG4gICAgICAgICAgc291cmNlOiB0aGlzXG4gICAgICAgIH0sXG4gICAgICAgIHk6IHtcbiAgICAgICAgICBuYW1lOiBuYW1lICsgJ195JyxcbiAgICAgICAgICB0eXBlOiB0eXBlcy5BTkFMT0csXG4gICAgICAgICAgc291cmNlOiB0aGlzXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpbnB1dC5vbignY2hhbmdlJywgKGRpcmVjdGlvbikgPT4ge1xuICAgICAgICBsb2dnZXIuZGVidWcoYERpZ2l0YWwgMkQgZGlyZWN0aW9uIHZhbHVlIGNoYW5nZWQgdG8gJHtkaXJlY3Rpb259IGZyb20gY29udHJvbGxlciAke3NwZWMubmFtZX1gKTtcbiAgICAgICAgY29uc3QgeyB4LCB5IH0gPSBkaXJlY3Rpb25Ub0F4ZXMoZGlyZWN0aW9uKTtcbiAgICAgICAgdGhpcy5lbWl0KCdjaGFuZ2UnLCBbe1xuICAgICAgICAgIHNvdXJjZTogbmFtZSArICdfeCcsXG4gICAgICAgICAgdmFsdWU6IHhcbiAgICAgICAgfSwge1xuICAgICAgICAgIHNvdXJjZTogbmFtZSArICdfeScsXG4gICAgICAgICAgdmFsdWU6IHlcbiAgICAgICAgfV0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIENvbnRyb2xsZXI7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=