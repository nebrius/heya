"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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

var events = _interopRequire(require("events"));

var fs = _interopRequire(require("fs"));

var util = _interopRequire(require("util"));

var http = _interopRequire(require("http"));

var inputTypes = require("../../constants.js").inputTypes;

var xAxis = Symbol("xAxis");
var yAxis = Symbol("yAxis");
var options = Symbol("options");

var WebKeyboard = exports.WebKeyboard = (function () {
  function WebKeyboard() {
    var opts = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, WebKeyboard);

    this[options] = opts;

    this[xAxis] = new events.EventEmitter();
    this[yAxis] = new events.EventEmitter();
    this[xAxis].type = this[yAxis].type = inputTypes.LINEAR;
  }

  _prototypeProperties(WebKeyboard, null, {
    getControllerAxes: {
      value: function getControllerAxes() {
        return {
          x: this[xAxis],
          y: this[yAxis]
        };
      },
      writable: true,
      configurable: true
    },
    connect: {
      value: function connect(cb) {
        var _this = this;

        var webpage = require("fs").readFileSync(__dirname + "/control.html").toString();
        var port = this[options].port || 8000;
        http.createServer(function (req, res) {
          var url = require("url").parse(req.url);
          var move = url.path.match(/^\/move\/(.*)$/);
          if (move) {
            var x, y;
            switch (move[1]) {
              case "up":
                x = 0;
                y = 1;
                break;
              case "upright":
                x = 0.707;
                y = 0.707;
                break;
              case "right":
                x = 1;
                y = 0;
                break;
              case "downright":
                x = 0.707;
                y = -0.707;
                break;
              case "down":
                x = 0;
                y = -1;
                break;
              case "downleft":
                x = -0.707;
                y = -0.707;
                break;
              case "left":
                x = -1;
                y = 0;
                break;
              case "upleft":
                x = -0.707;
                y = 0.707;
                break;
              case "none":
                x = 0;
                y = 0;
                break;
            }
            _this[xAxis].emit(move, x);
            _this[yAxis].emit(move, y);
            res.end();
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(webpage);
          }
        }).listen(port, "127.0.0.1", function () {
          cb();
          console.log("Open your browser and point it to http://127.0.0.1:" + port + " to control the bot");
        });
      },
      writable: true,
      configurable: true
    }
  });

  return WebKeyboard;
})();

Object.defineProperty(exports, "__esModule", {
  value: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL3dlYl9rZXlib2FyZC93ZWJfa2V5Ym9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF3Qk8sTUFBTSwyQkFBTSxRQUFROztJQUNwQixFQUFFLDJCQUFNLElBQUk7O0lBQ1osSUFBSSwyQkFBTSxNQUFNOztJQUNoQixJQUFJLDJCQUFNLE1BQU07O0lBRWQsVUFBVSxXQUFRLG9CQUFvQixFQUF0QyxVQUFVOztBQUVuQixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVCLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFFbkIsV0FBVyxXQUFYLFdBQVc7QUFFWCxXQUZBLFdBQVc7UUFFVixJQUFJLGdDQUFHLEVBQUU7OzBCQUZWLFdBQVc7O0FBR3BCLFFBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUM7O0FBRXJCLFFBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUN4QyxRQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDeEMsUUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7R0FDekQ7O3VCQVJVLFdBQVc7QUFVdEIscUJBQWlCO2FBQUEsNkJBQUc7QUFDbEIsZUFBTztBQUNMLFdBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ2QsV0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDZixDQUFBO09BQ0Y7Ozs7QUFFRCxXQUFPO2FBQUEsaUJBQUMsRUFBRSxFQUFFOzs7QUFDVixZQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNqRixZQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUN0QyxZQUFJLENBQUMsWUFBWSxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUM5QixjQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QyxjQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzVDLGNBQUksSUFBSSxFQUFFO0FBQ1IsZ0JBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNULG9CQUFRLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDYixtQkFBSyxJQUFJO0FBQ1AsaUJBQUMsR0FBRyxDQUFDLENBQUM7QUFDTixpQkFBQyxHQUFHLENBQUMsQ0FBQztBQUNOLHNCQUFNO0FBQUEsQUFDUixtQkFBSyxTQUFTO0FBQ1osaUJBQUMsR0FBRyxLQUFLLENBQUM7QUFDVixpQkFBQyxHQUFHLEtBQUssQ0FBQztBQUNWLHNCQUFNO0FBQUEsQUFDUixtQkFBSyxPQUFPO0FBQ1YsaUJBQUMsR0FBRyxDQUFDLENBQUM7QUFDTixpQkFBQyxHQUFHLENBQUMsQ0FBQztBQUNOLHNCQUFNO0FBQUEsQUFDUixtQkFBSyxXQUFXO0FBQ2QsaUJBQUMsR0FBRyxLQUFLLENBQUM7QUFDVixpQkFBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQ1gsc0JBQU07QUFBQSxBQUNSLG1CQUFLLE1BQU07QUFDVCxpQkFBQyxHQUFHLENBQUMsQ0FBQztBQUNOLGlCQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDUCxzQkFBTTtBQUFBLEFBQ1IsbUJBQUssVUFBVTtBQUNiLGlCQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDWCxpQkFBQyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQ1gsc0JBQU07QUFBQSxBQUNSLG1CQUFLLE1BQU07QUFDVCxpQkFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ1AsaUJBQUMsR0FBRyxDQUFDLENBQUM7QUFDTixzQkFBTTtBQUFBLEFBQ1IsbUJBQUssUUFBUTtBQUNYLGlCQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDWCxpQkFBQyxHQUFHLEtBQUssQ0FBQztBQUNWLHNCQUFNO0FBQUEsQUFDUixtQkFBSyxNQUFNO0FBQ1QsaUJBQUMsR0FBRyxDQUFDLENBQUM7QUFDTixpQkFBQyxHQUFHLENBQUMsQ0FBQztBQUNOLHNCQUFNO0FBQUEsYUFDVDtBQUNELGtCQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUIsa0JBQUssS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMxQixlQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7V0FDWCxNQUFNO0FBQ0wsZUFBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUNwRCxlQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1dBQ2xCO1NBQ0YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFlBQU07QUFDakMsWUFBRSxFQUFFLENBQUM7QUFDTCxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxxREFBcUQsR0FDL0QsSUFBSSxHQUFHLHFCQUFxQixDQUFDLENBQUM7U0FDakMsQ0FBQyxDQUFDO09BQ0o7Ozs7OztTQTNFVSxXQUFXIiwiZmlsZSI6ImNvbnRyb2xsZXJzL3dlYl9rZXlib2FyZC93ZWJfa2V5Ym9hcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuVGhlIE1JVCBMaWNlbnNlIChNSVQpXG5cbkNvcHlyaWdodCAoYykgMjAxNSBCcnlhbiBIdWdoZXMgPGJyeWFuQHRoZW9yZXRpY2FsaWRlYXRpb25zLmNvbT5cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuVEhFIFNPRlRXQVJFLlxuKi9cblxuaW1wb3J0IGV2ZW50cyBmcm9tICdldmVudHMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuaW1wb3J0IHV0aWwgZnJvbSAndXRpbCc7XG5pbXBvcnQgaHR0cCBmcm9tICdodHRwJztcblxuaW1wb3J0IHsgaW5wdXRUeXBlcyB9IGZyb20gJy4uLy4uL2NvbnN0YW50cy5qcyc7XG5cbnZhciB4QXhpcyA9IFN5bWJvbCgneEF4aXMnKTtcbnZhciB5QXhpcyA9IFN5bWJvbCgneUF4aXMnKTtcbnZhciBvcHRpb25zID0gU3ltYm9sKCdvcHRpb25zJyk7XG5cbmV4cG9ydCBjbGFzcyBXZWJLZXlib2FyZCB7XG5cbiAgY29uc3RydWN0b3Iob3B0cyA9IHt9KSB7XG4gICAgdGhpc1tvcHRpb25zXSA9IG9wdHM7XG5cbiAgICB0aGlzW3hBeGlzXSA9IG5ldyBldmVudHMuRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpc1t5QXhpc10gPSBuZXcgZXZlbnRzLkV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXNbeEF4aXNdLnR5cGUgPSB0aGlzW3lBeGlzXS50eXBlID0gaW5wdXRUeXBlcy5MSU5FQVI7XG4gIH1cblxuICBnZXRDb250cm9sbGVyQXhlcygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpc1t4QXhpc10sXG4gICAgICB5OiB0aGlzW3lBeGlzXVxuICAgIH1cbiAgfVxuXG4gIGNvbm5lY3QoY2IpIHtcbiAgICB2YXIgd2VicGFnZSA9IHJlcXVpcmUoJ2ZzJykucmVhZEZpbGVTeW5jKF9fZGlybmFtZSArICcvY29udHJvbC5odG1sJykudG9TdHJpbmcoKTtcbiAgICB2YXIgcG9ydCA9IHRoaXNbb3B0aW9uc10ucG9ydCB8fCA4MDAwO1xuICAgIGh0dHAuY3JlYXRlU2VydmVyKChyZXEsIHJlcykgPT4ge1xuICAgICAgdmFyIHVybCA9IHJlcXVpcmUoJ3VybCcpLnBhcnNlKHJlcS51cmwpO1xuICAgICAgdmFyIG1vdmUgPSB1cmwucGF0aC5tYXRjaCgvXlxcL21vdmVcXC8oLiopJC8pO1xuICAgICAgaWYgKG1vdmUpIHtcbiAgICAgICAgdmFyIHgsIHk7XG4gICAgICAgIHN3aXRjaCAobW92ZVsxXSkge1xuICAgICAgICAgIGNhc2UgJ3VwJzpcbiAgICAgICAgICAgIHggPSAwO1xuICAgICAgICAgICAgeSA9IDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd1cHJpZ2h0JzpcbiAgICAgICAgICAgIHggPSAwLjcwNztcbiAgICAgICAgICAgIHkgPSAwLjcwNztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgIHggPSAxO1xuICAgICAgICAgICAgeSA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdkb3ducmlnaHQnOlxuICAgICAgICAgICAgeCA9IDAuNzA3O1xuICAgICAgICAgICAgeSA9IC0wLjcwNztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2Rvd24nOlxuICAgICAgICAgICAgeCA9IDA7XG4gICAgICAgICAgICB5ID0gLTE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdkb3dubGVmdCc6XG4gICAgICAgICAgICB4ID0gLTAuNzA3O1xuICAgICAgICAgICAgeSA9IC0wLjcwNztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgeCA9IC0xO1xuICAgICAgICAgICAgeSA9IDA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd1cGxlZnQnOlxuICAgICAgICAgICAgeCA9IC0wLjcwNztcbiAgICAgICAgICAgIHkgPSAwLjcwNztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ25vbmUnOlxuICAgICAgICAgICAgeCA9IDA7XG4gICAgICAgICAgICB5ID0gMDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXNbeEF4aXNdLmVtaXQobW92ZSwgeCk7XG4gICAgICAgIHRoaXNbeUF4aXNdLmVtaXQobW92ZSwgeSk7XG4gICAgICAgIHJlcy5lbmQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7ICdDb250ZW50LVR5cGUnOiAndGV4dC9odG1sJyB9KTtcbiAgICAgICAgcmVzLmVuZCh3ZWJwYWdlKTtcbiAgICAgIH1cbiAgICB9KS5saXN0ZW4ocG9ydCwgJzEyNy4wLjAuMScsICgpID0+IHtcbiAgICAgIGNiKCk7XG4gICAgICBjb25zb2xlLmxvZygnT3BlbiB5b3VyIGJyb3dzZXIgYW5kIHBvaW50IGl0IHRvIGh0dHA6Ly8xMjcuMC4wLjE6JyArXG4gICAgICAgIHBvcnQgKyAnIHRvIGNvbnRyb2wgdGhlIGJvdCcpO1xuICAgIH0pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=