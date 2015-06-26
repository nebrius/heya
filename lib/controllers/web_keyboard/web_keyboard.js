"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

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

var events = _interopRequire(require("events"));

var fs = _interopRequire(require("fs"));

var util = _interopRequire(require("util"));

var http = _interopRequire(require("http"));

var directionToAxes = require("../../utils.js").directionToAxes;

var inputTypes = require("../../constants.js").inputTypes;

var options = Symbol("options");

var WebKeyboard = exports.WebKeyboard = function WebKeyboard() {
  var opts = arguments[0] === undefined ? {} : arguments[0];

  _classCallCheck(this, WebKeyboard);

  this[options] = opts;

  this.x = new events.EventEmitter();
  this.y = new events.EventEmitter();
  this.x.type = this.y.type = inputTypes.ANALOG_AXIS;

  this.defaults = {
    x: this.x,
    y: this.y
  };
}

/*connect(cb) {
  var webpage = require('fs').readFileSync(__dirname + '/control.html').toString();
  var port = this[options].port || 8000;
  http.createServer((req, res) => {
    var url = require('url').parse(req.url);
    var move = url.path.match(/^\/move\/(.*)$/);
    if (move) {
      let { x, y } = directionToAxes(move);
      this[xAxis].emit(move, x);
      this[yAxis].emit(move, y);
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(webpage);
    }
  }).listen(port, 'localhost', () => {
    cb();
    console.log('Open your browser and point it to http://localhost:' +
      port + ' to control the bot');
  });
}*/
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL3dlYl9rZXlib2FyZC93ZWJfa2V5Ym9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBd0JPLE1BQU0sMkJBQU0sUUFBUTs7SUFDcEIsRUFBRSwyQkFBTSxJQUFJOztJQUNaLElBQUksMkJBQU0sTUFBTTs7SUFDaEIsSUFBSSwyQkFBTSxNQUFNOztJQUVkLGVBQWUsV0FBUSxnQkFBZ0IsRUFBdkMsZUFBZTs7SUFDZixVQUFVLFdBQVEsb0JBQW9CLEVBQXRDLFVBQVU7O0FBRW5CLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFFbkIsV0FBVyxXQUFYLFdBQVcsR0FFWCxTQUZBLFdBQVcsR0FFQztNQUFYLElBQUksZ0NBQUcsRUFBRTs7d0JBRlYsV0FBVzs7QUFHcEIsTUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQzs7QUFFckIsTUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNuQyxNQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ25DLE1BQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7O0FBRW5ELE1BQUksQ0FBQyxRQUFRLEdBQUc7QUFDZCxLQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDVCxLQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDVixDQUFDO0NBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEiLCJmaWxlIjoiY29udHJvbGxlcnMvd2ViX2tleWJvYXJkL3dlYl9rZXlib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE1IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgZXZlbnRzIGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5pbXBvcnQgdXRpbCBmcm9tICd1dGlsJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuXG5pbXBvcnQgeyBkaXJlY3Rpb25Ub0F4ZXMgfSBmcm9tICcuLi8uLi91dGlscy5qcyc7XG5pbXBvcnQgeyBpbnB1dFR5cGVzIH0gZnJvbSAnLi4vLi4vY29uc3RhbnRzLmpzJztcblxudmFyIG9wdGlvbnMgPSBTeW1ib2woJ29wdGlvbnMnKTtcblxuZXhwb3J0IGNsYXNzIFdlYktleWJvYXJkIHtcblxuICBjb25zdHJ1Y3RvcihvcHRzID0ge30pIHtcbiAgICB0aGlzW29wdGlvbnNdID0gb3B0cztcblxuICAgIHRoaXMueCA9IG5ldyBldmVudHMuRXZlbnRFbWl0dGVyKCk7XG4gICAgdGhpcy55ID0gbmV3IGV2ZW50cy5FdmVudEVtaXR0ZXIoKTtcbiAgICB0aGlzLngudHlwZSA9IHRoaXMueS50eXBlID0gaW5wdXRUeXBlcy5BTkFMT0dfQVhJUztcblxuICAgIHRoaXMuZGVmYXVsdHMgPSB7XG4gICAgICB4OiB0aGlzLngsXG4gICAgICB5OiB0aGlzLnlcbiAgICB9O1xuICB9XG5cbiAgLypjb25uZWN0KGNiKSB7XG4gICAgdmFyIHdlYnBhZ2UgPSByZXF1aXJlKCdmcycpLnJlYWRGaWxlU3luYyhfX2Rpcm5hbWUgKyAnL2NvbnRyb2wuaHRtbCcpLnRvU3RyaW5nKCk7XG4gICAgdmFyIHBvcnQgPSB0aGlzW29wdGlvbnNdLnBvcnQgfHwgODAwMDtcbiAgICBodHRwLmNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcbiAgICAgIHZhciB1cmwgPSByZXF1aXJlKCd1cmwnKS5wYXJzZShyZXEudXJsKTtcbiAgICAgIHZhciBtb3ZlID0gdXJsLnBhdGgubWF0Y2goL15cXC9tb3ZlXFwvKC4qKSQvKTtcbiAgICAgIGlmIChtb3ZlKSB7XG4gICAgICAgIGxldCB7IHgsIHkgfSA9IGRpcmVjdGlvblRvQXhlcyhtb3ZlKTtcbiAgICAgICAgdGhpc1t4QXhpc10uZW1pdChtb3ZlLCB4KTtcbiAgICAgICAgdGhpc1t5QXhpc10uZW1pdChtb3ZlLCB5KTtcbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWwnIH0pO1xuICAgICAgICByZXMuZW5kKHdlYnBhZ2UpO1xuICAgICAgfVxuICAgIH0pLmxpc3Rlbihwb3J0LCAnbG9jYWxob3N0JywgKCkgPT4ge1xuICAgICAgY2IoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdPcGVuIHlvdXIgYnJvd3NlciBhbmQgcG9pbnQgaXQgdG8gaHR0cDovL2xvY2FsaG9zdDonICtcbiAgICAgICAgcG9ydCArICcgdG8gY29udHJvbCB0aGUgYm90Jyk7XG4gICAgfSk7XG4gIH0qL1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9