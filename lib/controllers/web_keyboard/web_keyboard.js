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

var EventEmitter = require("events").EventEmitter;

var fs = _interopRequire(require("fs"));

var http = _interopRequire(require("http"));

var path = _interopRequire(require("path"));

var _controllerJs = require("../controller.js");

var createController = _controllerJs.createController;
var types = _controllerJs.types;

var logger = _interopRequire(require("../../logging.js"));

var options = Symbol("options");
var direction = Symbol("direction");

var WebKeyboard = createController({

  name: "WebKeyboard",

  initialize: function initialize() {
    var opts = arguments[0] === undefined ? {} : arguments[0];

    this[options] = opts;

    this[direction] = new EventEmitter();
    this[direction].type = types.DIGITAL_2D_DIRECTION;

    this.inputs = {
      direction: this[direction]
    };
  },

  connect: function connect(cb) {
    var _this = this;

    var webpage = fs.readFileSync(path.join(__dirname, "control.html")).toString();
    var port = this[options].port || 8000;
    http.createServer(function (req, res) {
      var url = require("url").parse(req.url);
      var move = url.path.match(/^\/move\/(.*)$/);
      if (move) {
        _this[direction].emit("change", move[1]);
        res.end();
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(webpage);
      }
    }).listen(port, "localhost", function () {
      logger.info("Open your browser and point it to http://localhost:" + port + " to control the bot");
      cb();
    });
  }
});
exports.WebKeyboard = WebKeyboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRyb2xsZXJzL3dlYl9rZXlib2FyZC93ZWJfa2V5Ym9hcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXdCUyxZQUFZLFdBQVEsUUFBUSxFQUE1QixZQUFZOztJQUNkLEVBQUUsMkJBQU0sSUFBSTs7SUFDWixJQUFJLDJCQUFNLE1BQU07O0lBQ2hCLElBQUksMkJBQU0sTUFBTTs7NEJBQ2lCLGtCQUFrQjs7SUFBakQsZ0JBQWdCLGlCQUFoQixnQkFBZ0I7SUFBRSxLQUFLLGlCQUFMLEtBQUs7O0lBQ3pCLE1BQU0sMkJBQU0sa0JBQWtCOztBQUVyQyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztBQUUvQixJQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQzs7QUFFMUMsTUFBSSxFQUFFLGFBQWE7O0FBRW5CLFlBQVUsRUFBQSxzQkFBWTtRQUFYLElBQUksZ0NBQUcsRUFBRTs7QUFDbEIsUUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQzs7QUFFckIsUUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7QUFDckMsUUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsb0JBQW9CLENBQUM7O0FBRWxELFFBQUksQ0FBQyxNQUFNLEdBQUc7QUFDWixlQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUMzQixDQUFDO0dBQ0g7O0FBRUQsU0FBTyxFQUFBLGlCQUFDLEVBQUUsRUFBRTs7O0FBQ1YsUUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2pGLFFBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQ3hDLFFBQUksQ0FBQyxZQUFZLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFLO0FBQzlCLFVBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLFVBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDOUMsVUFBSSxJQUFJLEVBQUU7QUFDUixjQUFLLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEMsV0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO09BQ1gsTUFBTTtBQUNMLFdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUMsY0FBYyxFQUFFLFdBQVcsRUFBQyxDQUFDLENBQUM7QUFDbEQsV0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUNsQjtLQUNGLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxZQUFNO0FBQ2pDLFlBQU0sQ0FBQyxJQUFJLHlEQUF1RCxJQUFJLHlCQUFzQixDQUFDO0FBQzdGLFFBQUUsRUFBRSxDQUFDO0tBQ04sQ0FBQyxDQUFDO0dBQ0o7Q0FDRixDQUFDLENBQUM7UUFqQ1UsV0FBVyxHQUFYLFdBQVciLCJmaWxlIjoiY29udHJvbGxlcnMvd2ViX2tleWJvYXJkL3dlYl9rZXlib2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE1IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBjcmVhdGVDb250cm9sbGVyLCB0eXBlcyB9IGZyb20gJy4uL2NvbnRyb2xsZXIuanMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi8uLi9sb2dnaW5nLmpzJztcblxuY29uc3Qgb3B0aW9ucyA9IFN5bWJvbCgnb3B0aW9ucycpO1xuY29uc3QgZGlyZWN0aW9uID0gU3ltYm9sKCdkaXJlY3Rpb24nKTtcblxuZXhwb3J0IGNvbnN0IFdlYktleWJvYXJkID0gY3JlYXRlQ29udHJvbGxlcih7XG5cbiAgbmFtZTogJ1dlYktleWJvYXJkJyxcblxuICBpbml0aWFsaXplKG9wdHMgPSB7fSkge1xuICAgIHRoaXNbb3B0aW9uc10gPSBvcHRzO1xuXG4gICAgdGhpc1tkaXJlY3Rpb25dID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIHRoaXNbZGlyZWN0aW9uXS50eXBlID0gdHlwZXMuRElHSVRBTF8yRF9ESVJFQ1RJT047XG5cbiAgICB0aGlzLmlucHV0cyA9IHtcbiAgICAgIGRpcmVjdGlvbjogdGhpc1tkaXJlY3Rpb25dXG4gICAgfTtcbiAgfSxcblxuICBjb25uZWN0KGNiKSB7XG4gICAgY29uc3Qgd2VicGFnZSA9IGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCAnY29udHJvbC5odG1sJykpLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgcG9ydCA9IHRoaXNbb3B0aW9uc10ucG9ydCB8fCA4MDAwO1xuICAgIGh0dHAuY3JlYXRlU2VydmVyKChyZXEsIHJlcykgPT4ge1xuICAgICAgY29uc3QgdXJsID0gcmVxdWlyZSgndXJsJykucGFyc2UocmVxLnVybCk7XG4gICAgICBjb25zdCBtb3ZlID0gdXJsLnBhdGgubWF0Y2goL15cXC9tb3ZlXFwvKC4qKSQvKTtcbiAgICAgIGlmIChtb3ZlKSB7XG4gICAgICAgIHRoaXNbZGlyZWN0aW9uXS5lbWl0KCdjaGFuZ2UnLCBtb3ZlWzFdKTtcbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHsnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCd9KTtcbiAgICAgICAgcmVzLmVuZCh3ZWJwYWdlKTtcbiAgICAgIH1cbiAgICB9KS5saXN0ZW4ocG9ydCwgJ2xvY2FsaG9zdCcsICgpID0+IHtcbiAgICAgIGxvZ2dlci5pbmZvKGBPcGVuIHlvdXIgYnJvd3NlciBhbmQgcG9pbnQgaXQgdG8gaHR0cDovL2xvY2FsaG9zdDoke3BvcnR9IHRvIGNvbnRyb2wgdGhlIGJvdGApO1xuICAgICAgY2IoKTtcbiAgICB9KTtcbiAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=