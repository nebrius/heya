"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

exports.connect = connect;
exports.run = run;
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

require("babel/polyfill");

var types = require("./constants.js").types;

var logger = _interopRequire(require("./logging.js"));

var async = _interopRequire(require("async"));

exports.WebKeyboard = require("./controllers/web_keyboard/web_keyboard.js").WebKeyboard;
exports.DifferentialServos = require("./drivers/differential_servos/differential_servos.js").DifferentialServos;

var bots = new Set();

function connect(mapping, driver) {
  // If two arguments were passed in, assume that they are a controller/driver pair
  if (arguments.length == 2) {
    mapping = {
      input: mapping,
      output: driver
    };
  } else if (arguments.length != 1) {
    throw new Error("Invalid number of arguments passed to \"connect\"");
  }
  if (!Array.isArray(mapping)) {
    mapping = [mapping];
  }

  // Helper method for connecting an input/output pair
  function connectPair(input, output, filters) {
    logger.debug("Connecting " + input.name + " in " + input.source.name + " to " + output.name + " in " + output.source.name);
    input.on("change", function (data) {
      output.respond(filters.reduce(function (filteredData, filter) {
        return filter(filteredData);
      }, data));
    });
    bots.add(input.source);
    bots.add(output.source);
  }

  // Loop through each input/output pair and map them
  mapping.forEach(function (_ref) {
    var input = _ref.input;
    var output = _ref.output;
    var _ref$filters = _ref.filters;
    var filters = _ref$filters === undefined ? [] : _ref$filters;

    if (input.type == types.CONTROLLER && output.type == types.DRIVER) {
      throw new Error("Support for mapping default controller inputs to driver outputs is not yet supported");
    } else if (input.type && input.type == output.type) {
      connectPair(input, output, filters);
    } else {
      throw new Error("Invalid input/output pair. Each pair must either be a controller and driver, or have the same source type");
    }
  });
}

function run(cb) {
  logger.debug("Connecting to " + bots.size + " bots");
  async.parallel(Array.from(bots).map(function (bot) {
    return function (next) {
      return bot.connect(next);
    };
  }), function () {
    logger.debug("All bots connected");
    cb();
  });
}
//# sourceMappingURL=data:application/json;base64,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QUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0tBQUE7R0FBQSxDQUFDLEVBQUUsWUFBTTtBQUMvRSxVQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbkMsTUFBRSxFQUFFLENBQUM7R0FDTixDQUFDLENBQUM7Q0FDSiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE1IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgJ2JhYmVsL3BvbHlmaWxsJztcbmltcG9ydCB7IHR5cGVzIH0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dpbmcuanMnO1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcblxuZXhwb3J0IHsgV2ViS2V5Ym9hcmQgfSBmcm9tICcuL2NvbnRyb2xsZXJzL3dlYl9rZXlib2FyZC93ZWJfa2V5Ym9hcmQuanMnO1xuZXhwb3J0IHsgRGlmZmVyZW50aWFsU2Vydm9zIH0gZnJvbSAnLi9kcml2ZXJzL2RpZmZlcmVudGlhbF9zZXJ2b3MvZGlmZmVyZW50aWFsX3NlcnZvcy5qcyc7XG5cbmNvbnN0IGJvdHMgPSBuZXcgU2V0KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25uZWN0KG1hcHBpbmcsIGRyaXZlcikge1xuICAvLyBJZiB0d28gYXJndW1lbnRzIHdlcmUgcGFzc2VkIGluLCBhc3N1bWUgdGhhdCB0aGV5IGFyZSBhIGNvbnRyb2xsZXIvZHJpdmVyIHBhaXJcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikge1xuICAgIG1hcHBpbmcgPSB7XG4gICAgICBpbnB1dDogbWFwcGluZyxcbiAgICAgIG91dHB1dDogZHJpdmVyXG4gICAgfTtcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoICE9IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbnVtYmVyIG9mIGFyZ3VtZW50cyBwYXNzZWQgdG8gXCJjb25uZWN0XCInKTtcbiAgfVxuICBpZiAoIUFycmF5LmlzQXJyYXkobWFwcGluZykpIHtcbiAgICBtYXBwaW5nID0gWyBtYXBwaW5nIF07XG4gIH1cblxuICAvLyBIZWxwZXIgbWV0aG9kIGZvciBjb25uZWN0aW5nIGFuIGlucHV0L291dHB1dCBwYWlyXG4gIGZ1bmN0aW9uIGNvbm5lY3RQYWlyKGlucHV0LCBvdXRwdXQsIGZpbHRlcnMpIHtcbiAgICBsb2dnZXIuZGVidWcoYENvbm5lY3RpbmcgJHtpbnB1dC5uYW1lfSBpbiAke2lucHV0LnNvdXJjZS5uYW1lfSB0byAke291dHB1dC5uYW1lfSBpbiAke291dHB1dC5zb3VyY2UubmFtZX1gKTtcbiAgICBpbnB1dC5vbignY2hhbmdlJywgKGRhdGEpID0+IHtcbiAgICAgIG91dHB1dC5yZXNwb25kKGZpbHRlcnMucmVkdWNlKChmaWx0ZXJlZERhdGEsIGZpbHRlcikgPT4ge1xuICAgICAgICByZXR1cm4gZmlsdGVyKGZpbHRlcmVkRGF0YSk7XG4gICAgICB9LCBkYXRhKSk7XG4gICAgfSk7XG4gICAgYm90cy5hZGQoaW5wdXQuc291cmNlKTtcbiAgICBib3RzLmFkZChvdXRwdXQuc291cmNlKTtcbiAgfVxuXG4gIC8vIExvb3AgdGhyb3VnaCBlYWNoIGlucHV0L291dHB1dCBwYWlyIGFuZCBtYXAgdGhlbVxuICBtYXBwaW5nLmZvckVhY2goKHsgaW5wdXQsIG91dHB1dCwgZmlsdGVycz1bXSB9KSA9PiB7XG4gICAgaWYgKGlucHV0LnR5cGUgPT0gdHlwZXMuQ09OVFJPTExFUiAmJiBvdXRwdXQudHlwZSA9PSB0eXBlcy5EUklWRVIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU3VwcG9ydCBmb3IgbWFwcGluZyBkZWZhdWx0IGNvbnRyb2xsZXIgaW5wdXRzIHRvIGRyaXZlciBvdXRwdXRzIGlzIG5vdCB5ZXQgc3VwcG9ydGVkJyk7XG4gICAgfSBlbHNlIGlmIChpbnB1dC50eXBlICYmIGlucHV0LnR5cGUgPT0gb3V0cHV0LnR5cGUpIHtcbiAgICAgIGNvbm5lY3RQYWlyKGlucHV0LCBvdXRwdXQsIGZpbHRlcnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgaW5wdXQvb3V0cHV0IHBhaXIuIEVhY2ggcGFpciBtdXN0IGVpdGhlciBiZSBhIGNvbnRyb2xsZXIgYW5kIGRyaXZlciwgb3IgaGF2ZSB0aGUgc2FtZSBzb3VyY2UgdHlwZScpO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBydW4oY2IpIHtcbiAgbG9nZ2VyLmRlYnVnKGBDb25uZWN0aW5nIHRvICR7Ym90cy5zaXplfSBib3RzYCk7XG4gIGFzeW5jLnBhcmFsbGVsKEFycmF5LmZyb20oYm90cykubWFwKChib3QpID0+IChuZXh0KSA9PiBib3QuY29ubmVjdChuZXh0KSksICgpID0+IHtcbiAgICBsb2dnZXIuZGVidWcoJ0FsbCBib3RzIGNvbm5lY3RlZCcpO1xuICAgIGNiKCk7XG4gIH0pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9