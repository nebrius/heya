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

  return Controller;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL2NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O1FBK0JnQixnQkFBZ0IsR0FBaEIsZ0JBQWdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBUHZCLFlBQVksV0FBUSxRQUFRLEVBQTVCLFlBQVk7OzJCQUNhLGlCQUFpQjs7SUFBMUMsS0FBSyxnQkFBTCxLQUFLO0lBQUUsVUFBVSxnQkFBVixVQUFVOztJQUNuQixlQUFlLDJCQUFNLG1EQUFtRDs7SUFDeEUsTUFBTSwyQkFBTSxlQUFlOztBQUVsQyxJQUFNLHdCQUF3QixHQUFHLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDOztBQUU3RCxTQUFTLGdCQUFnQixDQUFDLElBQUksRUFBRTtBQUNyQyxNQUFJLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxVQUFVLElBQUksT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLFVBQVUsRUFBRTtBQUM3RSxVQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7R0FDbEQ7QUFDRCxRQUFNLENBQUMsS0FBSywwQkFBd0IsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDOztNQUUzQyxVQUFVO0FBRUgsYUFGUCxVQUFVLEdBRU87d0NBQU4sSUFBSTtBQUFKLFlBQUk7Ozs0QkFGZixVQUFVOztBQUdaLGlDQUhFLFVBQVUsNkNBR0o7QUFDUixVQUFJLENBQUMsVUFBVSxNQUFBLENBQWYsSUFBSSxFQUFlLElBQUksQ0FBQyxDQUFDOztBQUV6QixVQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7QUFDN0IsVUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDakIsVUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOztBQUV0QixVQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLFVBQUksQ0FBQyxNQUFNLElBQUksT0FBTyxNQUFNLElBQUksUUFBUSxFQUFFO0FBQ3hDLGNBQU0sSUFBSSxLQUFLLDBCQUF1QixJQUFJLENBQUMsSUFBSSxJQUFJLG9CQUFvQixDQUFBLENBQUcsQ0FBQztPQUM1RTtBQUNELFVBQUksS0FBSyxZQUFBLENBQUM7QUFDVixXQUFLLEtBQUssSUFBSSxNQUFNLEVBQUU7QUFDcEIsWUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ2hDLGtCQUFRLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJO0FBQ3hCLGlCQUFLLFVBQVUsQ0FBQyxvQkFBb0I7QUFDbEMsa0JBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNyRCxvQkFBTTtBQUFBLEFBQ1I7QUFDRSxvQkFBTSxJQUFJLEtBQUssb0NBQWtDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQUksQ0FBQztBQUFBLFdBQzNFO1NBQ0Y7T0FDRjtLQUNGOztjQTFCRyxVQUFVOzt5QkFBVixVQUFVOzthQTRCUCxpQkFBQyxFQUFFLEVBQUU7QUFDVixZQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQ2xCOztXQUVBLHdCQUF3QjthQUFDLFVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUN0QyxjQUFNLENBQUMsS0FBSyxvREFBa0QsSUFBSSxDQUFDLElBQUksQ0FBRyxDQUFDO0FBQzNFLFlBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFZLEVBQUUsRUFBRTtBQUNqRCxjQUFJLEVBQUUsSUFBSSxHQUFHLElBQUk7QUFDakIsY0FBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ2xCLGdCQUFNLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztBQUNILFlBQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxZQUFZLEVBQUUsRUFBRTtBQUNqRCxjQUFJLEVBQUUsSUFBSSxHQUFHLElBQUk7QUFDakIsY0FBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO0FBQ2xCLGdCQUFNLEVBQUUsSUFBSTtTQUNiLENBQUMsQ0FBQztBQUNILFlBQUksQ0FBQyxJQUFJLENBQUMsR0FBRztBQUNYLFdBQUMsRUFBRSxRQUFRO0FBQ1gsV0FBQyxFQUFFLFFBQVE7U0FDWixDQUFDO0FBQ0YsYUFBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsVUFBQyxTQUFTLEVBQUs7QUFDaEMsZ0JBQU0sQ0FBQyxLQUFLLGlCQUFlLElBQUksQ0FBQyxJQUFJLDRDQUF1QyxTQUFTLENBQUcsQ0FBQzs7aUNBQ3ZFLGVBQWUsQ0FBQyxTQUFTLENBQUM7O2NBQW5DLENBQUMsb0JBQUQsQ0FBQztjQUFFLENBQUMsb0JBQUQsQ0FBQzs7QUFDWixrQkFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDM0Isa0JBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzVCLENBQUMsQ0FBQztPQUNKOzs7V0F0REcsVUFBVTtLQUFTLFlBQVk7O0FBeURyQyxTQUFPLFVBQVUsQ0FBQztDQUNuQiIsImZpbGUiOiJjb250cm9sbGVycy9jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTUgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgeyB0eXBlcywgaW5wdXRUeXBlcyB9IGZyb20gJy4uL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgZGlyZWN0aW9uVG9BeGVzIGZyb20gJy4uL2ZpbHRlcnMvZGlyZWN0aW9uX3RvX2F4ZXMvZGlyZWN0aW9uX3RvX2F4ZXMuanMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9sb2dnaW5nLmpzJztcblxuY29uc3QgaGFuZGxlRGlnaXRhbDJERGlyZWN0aW9uID0gU3ltYm9sKCdoYW5kbGVEaWdpdGFsMkREaXJlY3Rpb24nKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvbnRyb2xsZXIoc3BlYykge1xuICBpZiAodHlwZW9mIHNwZWMuaW5pdGlhbGl6ZSAhPSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBzcGVjLmNvbm5lY3QgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb250cm9sbGVyIGRlZmluaXRpb24nKTtcbiAgfVxuICBsb2dnZXIuZGVidWcoYENyZWF0aW5nIGNvbnRyb2xsZXIgJHtzcGVjLm5hbWV9YCk7XG5cbiAgY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBjb25zdHJ1Y3RvciguLi5vcHRzKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgc3BlYy5pbml0aWFsaXplKC4uLm9wdHMpO1xuXG4gICAgICB0aGlzLnR5cGUgPSB0eXBlcy5DT05UUk9MTEVSO1xuICAgICAgdGhpcy5pbnB1dHMgPSB7fTtcbiAgICAgIHRoaXMubmFtZSA9IHNwZWMubmFtZTtcblxuICAgICAgY29uc3QgaW5wdXRzID0gc3BlYy5pbnB1dHM7XG4gICAgICBpZiAoIWlucHV0cyB8fCB0eXBlb2YgaW5wdXRzICE9ICdvYmplY3QnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBpbnB1dHMgZm9yICR7c3BlYy5uYW1lIHx8ICd1bm5hbWVkIGNvbnRyb2xsZXInfWApO1xuICAgICAgfVxuICAgICAgbGV0IGlucHV0OyAvLyBlc2xpbnQgYW5kIGJhYmVsIGRpc2FncmVlIG9uIHdoZXRoZXIgdG8gdXNlIGxldCBvciBjb25zdCBpbmxpbmUgaW4gdGhlIGZvci4uLmluXG4gICAgICBmb3IgKGlucHV0IGluIGlucHV0cykge1xuICAgICAgICBpZiAoaW5wdXRzLmhhc093blByb3BlcnR5KGlucHV0KSkge1xuICAgICAgICAgIHN3aXRjaCAoaW5wdXRzW2lucHV0XS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIGlucHV0VHlwZXMuRElHSVRBTF8yRF9ESVJFQ1RJT046XG4gICAgICAgICAgICAgIHRoaXNbaGFuZGxlRGlnaXRhbDJERGlyZWN0aW9uXShpbnB1dCwgaW5wdXRzW2lucHV0XSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIGNvbnRyb2xsZXIgaW5wdXQgdHlwZSAke2lucHV0c1tpbnB1dF0udHlwZX1cImApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbm5lY3QoY2IpIHtcbiAgICAgIHNwZWMuY29ubmVjdChjYik7XG4gICAgfVxuXG4gICAgW2hhbmRsZURpZ2l0YWwyRERpcmVjdGlvbl0obmFtZSwgaW5wdXQpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhgV2lyaW5nIHVwIGRpZ2l0YWwgMkQgZGlyZWN0aW9uIGZvciBjb250cm9sbGVyICR7c3BlYy5uYW1lfWApO1xuICAgICAgY29uc3QgeEVtaXR0ZXIgPSBPYmplY3QuYXNzaWduKG5ldyBFdmVudEVtaXR0ZXIoKSwge1xuICAgICAgICBuYW1lOiBuYW1lICsgJ194JyxcbiAgICAgICAgdHlwZTogdHlwZXMuQU5BTE9HLFxuICAgICAgICBzb3VyY2U6IHRoaXNcbiAgICAgIH0pO1xuICAgICAgY29uc3QgeUVtaXR0ZXIgPSBPYmplY3QuYXNzaWduKG5ldyBFdmVudEVtaXR0ZXIoKSwge1xuICAgICAgICBuYW1lOiBuYW1lICsgJ195JyxcbiAgICAgICAgdHlwZTogdHlwZXMuQU5BTE9HLFxuICAgICAgICBzb3VyY2U6IHRoaXNcbiAgICAgIH0pO1xuICAgICAgdGhpc1tuYW1lXSA9IHtcbiAgICAgICAgeDogeEVtaXR0ZXIsXG4gICAgICAgIHk6IHlFbWl0dGVyXG4gICAgICB9O1xuICAgICAgaW5wdXQub24oJ2NoYW5nZScsIChkaXJlY3Rpb24pID0+IHtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKGBDb250cm9sbGVyICR7c3BlYy5uYW1lfSBlbWl0dGVkIGRpZ2l0YWwgMkQgZGlyZWN0aW9uIHZhbHVlICR7ZGlyZWN0aW9ufWApO1xuICAgICAgICBjb25zdCB7IHgsIHkgfSA9IGRpcmVjdGlvblRvQXhlcyhkaXJlY3Rpb24pO1xuICAgICAgICB4RW1pdHRlci5lbWl0KCdjaGFuZ2UnLCB4KTtcbiAgICAgICAgeUVtaXR0ZXIuZW1pdCgnY2hhbmdlJywgeSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gQ29udHJvbGxlcjtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==