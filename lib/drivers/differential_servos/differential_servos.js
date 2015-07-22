"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

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

var outputTypes = require("../../constants.js").outputTypes;

var createDriver = require("../driver.js").createDriver;

var five = _interopRequire(require("johnny-five"));

var options = Symbol("options");
var wheels = Symbol("direction");
var leftServo = Symbol("leftServo");
var rightServo = Symbol("rightServo");

var idCounter = 1;

var DifferentialServos = createDriver({

  name: "DifferentialServos",

  initialize: function initialize(opts) {
    this[options] = opts;

    this[wheels] = {
      type: outputTypes.ANALOG_2D_DIFFERENTIAL,
      respond: function respond(left, right) {
        console.log(left, right);
        //if (left < 1) {
        //  this[leftServo].cw(-left);
        //} else {
        //  this[leftServo].ccw(left);
        //}
        //if (right < 1) {
        //  this[rightServo].ccw(-right);
        //} else {
        //  this[rightServo].cw(right);
        //}
      }
    };

    this.outputs = {
      wheels: this[wheels]
    };
  },

  connect: function connect(cb) {
    var _this = this;

    cb();
    return;
    var id = "differential_servos_" + idCounter++ + "}";
    var board = new five.Board({
      repl: false,
      io: this[options].io,
      id: id
    });

    board.on("ready", function () {
      _this[leftServo] = new five.Servo({
        pin: _this[options].leftServo,
        type: "continuous",
        id: id
      });

      _this[rightServo] = new five.Servo({
        pin: _this[options].rightServo,
        type: "continuous",
        id: id
      });

      _this[leftServo].stop();
      _this[rightServo].stop();

      cb();
    });
  }
});
exports.DifferentialServos = DifferentialServos;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyaXZlcnMvZGlmZmVyZW50aWFsX3NlcnZvcy9kaWZmZXJlbnRpYWxfc2Vydm9zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3QlMsV0FBVyxXQUFRLG9CQUFvQixFQUF2QyxXQUFXOztJQUNYLFlBQVksV0FBUSxjQUFjLEVBQWxDLFlBQVk7O0lBQ2QsSUFBSSwyQkFBTSxhQUFhOztBQUU5QixJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ25DLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUN0QyxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7O0FBRXhDLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQzs7QUFFWCxJQUFNLGtCQUFrQixHQUFHLFlBQVksQ0FBQzs7QUFFN0MsTUFBSSxFQUFFLG9CQUFvQjs7QUFFMUIsWUFBVSxFQUFBLG9CQUFDLElBQUksRUFBRTtBQUNmLFFBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7O0FBRXJCLFFBQUksQ0FBQyxNQUFNLENBQUMsR0FBRztBQUNiLFVBQUksRUFBRSxXQUFXLENBQUMsc0JBQXNCO0FBQ3hDLGFBQU8sRUFBQSxpQkFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ25CLGVBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7OztPQVcxQjtLQUNGLENBQUM7O0FBRUYsUUFBSSxDQUFDLE9BQU8sR0FBRztBQUNiLFlBQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3JCLENBQUM7R0FDSDs7QUFFRCxTQUFPLEVBQUEsaUJBQUMsRUFBRSxFQUFFOzs7QUFDVixNQUFFLEVBQUUsQ0FBQztBQUNMLFdBQU87QUFDUCxRQUFNLEVBQUUsNEJBQTBCLFNBQVMsRUFBRSxNQUFHLENBQUM7QUFDakQsUUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQzNCLFVBQUksRUFBRSxLQUFLO0FBQ1gsUUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFO0FBQ3BCLFFBQUUsRUFBRixFQUFFO0tBQ0gsQ0FBQyxDQUFDOztBQUVILFNBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDdEIsWUFBSyxTQUFTLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDL0IsV0FBRyxFQUFFLE1BQUssT0FBTyxDQUFDLENBQUMsU0FBUztBQUM1QixZQUFJLEVBQUUsWUFBWTtBQUNsQixVQUFFLEVBQUYsRUFBRTtPQUNILENBQUMsQ0FBQzs7QUFFSCxZQUFLLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztBQUNoQyxXQUFHLEVBQUUsTUFBSyxPQUFPLENBQUMsQ0FBQyxVQUFVO0FBQzdCLFlBQUksRUFBRSxZQUFZO0FBQ2xCLFVBQUUsRUFBRixFQUFFO09BQ0gsQ0FBQyxDQUFDOztBQUVILFlBQUssU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkIsWUFBSyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFeEIsUUFBRSxFQUFFLENBQUM7S0FDTixDQUFDLENBQUM7R0FDSjtDQUNGLENBQUMsQ0FBQztRQTFEVSxrQkFBa0IsR0FBbEIsa0JBQWtCIiwiZmlsZSI6ImRyaXZlcnMvZGlmZmVyZW50aWFsX3NlcnZvcy9kaWZmZXJlbnRpYWxfc2Vydm9zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTUgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCB7IG91dHB1dFR5cGVzIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzLmpzJztcbmltcG9ydCB7IGNyZWF0ZURyaXZlciB9IGZyb20gJy4uL2RyaXZlci5qcyc7XG5pbXBvcnQgZml2ZSBmcm9tICdqb2hubnktZml2ZSc7XG5cbmNvbnN0IG9wdGlvbnMgPSBTeW1ib2woJ29wdGlvbnMnKTtcbmNvbnN0IHdoZWVscyA9IFN5bWJvbCgnZGlyZWN0aW9uJyk7XG5jb25zdCBsZWZ0U2Vydm8gPSBTeW1ib2woJ2xlZnRTZXJ2bycpO1xuY29uc3QgcmlnaHRTZXJ2byA9IFN5bWJvbCgncmlnaHRTZXJ2bycpO1xuXG5sZXQgaWRDb3VudGVyID0gMTtcblxuZXhwb3J0IGNvbnN0IERpZmZlcmVudGlhbFNlcnZvcyA9IGNyZWF0ZURyaXZlcih7XG5cbiAgbmFtZTogJ0RpZmZlcmVudGlhbFNlcnZvcycsXG5cbiAgaW5pdGlhbGl6ZShvcHRzKSB7XG4gICAgdGhpc1tvcHRpb25zXSA9IG9wdHM7XG5cbiAgICB0aGlzW3doZWVsc10gPSB7XG4gICAgICB0eXBlOiBvdXRwdXRUeXBlcy5BTkFMT0dfMkRfRElGRkVSRU5USUFMLFxuICAgICAgcmVzcG9uZChsZWZ0LCByaWdodCkge1xuICAgICAgICBjb25zb2xlLmxvZyhsZWZ0LCByaWdodCk7XG4gICAgICAgIC8vaWYgKGxlZnQgPCAxKSB7XG4gICAgICAgIC8vICB0aGlzW2xlZnRTZXJ2b10uY3coLWxlZnQpO1xuICAgICAgICAvL30gZWxzZSB7XG4gICAgICAgIC8vICB0aGlzW2xlZnRTZXJ2b10uY2N3KGxlZnQpO1xuICAgICAgICAvL31cbiAgICAgICAgLy9pZiAocmlnaHQgPCAxKSB7XG4gICAgICAgIC8vICB0aGlzW3JpZ2h0U2Vydm9dLmNjdygtcmlnaHQpO1xuICAgICAgICAvL30gZWxzZSB7XG4gICAgICAgIC8vICB0aGlzW3JpZ2h0U2Vydm9dLmN3KHJpZ2h0KTtcbiAgICAgICAgLy99XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMub3V0cHV0cyA9IHtcbiAgICAgIHdoZWVsczogdGhpc1t3aGVlbHNdXG4gICAgfTtcbiAgfSxcblxuICBjb25uZWN0KGNiKSB7XG4gICAgY2IoKTtcbiAgICByZXR1cm47XG4gICAgY29uc3QgaWQgPSBgZGlmZmVyZW50aWFsX3NlcnZvc18ke2lkQ291bnRlcisrfX1gO1xuICAgIGNvbnN0IGJvYXJkID0gbmV3IGZpdmUuQm9hcmQoe1xuICAgICAgcmVwbDogZmFsc2UsXG4gICAgICBpbzogdGhpc1tvcHRpb25zXS5pbyxcbiAgICAgIGlkXG4gICAgfSk7XG5cbiAgICBib2FyZC5vbigncmVhZHknLCAoKSA9PiB7XG4gICAgICB0aGlzW2xlZnRTZXJ2b10gPSBuZXcgZml2ZS5TZXJ2byh7XG4gICAgICAgIHBpbjogdGhpc1tvcHRpb25zXS5sZWZ0U2Vydm8sXG4gICAgICAgIHR5cGU6ICdjb250aW51b3VzJyxcbiAgICAgICAgaWRcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzW3JpZ2h0U2Vydm9dID0gbmV3IGZpdmUuU2Vydm8oe1xuICAgICAgICBwaW46IHRoaXNbb3B0aW9uc10ucmlnaHRTZXJ2byxcbiAgICAgICAgdHlwZTogJ2NvbnRpbnVvdXMnLFxuICAgICAgICBpZFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXNbbGVmdFNlcnZvXS5zdG9wKCk7XG4gICAgICB0aGlzW3JpZ2h0U2Vydm9dLnN0b3AoKTtcblxuICAgICAgY2IoKTtcbiAgICB9KTtcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=