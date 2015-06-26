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

var _events = require("events");

var EventEmitter = _events.EventEmitter;

var async = _interopRequire(require("async"));

var events = _interopRequire(_events);

require("es6-symbol/implement");

exports.WebKeyboard = require("./controllers/web_keyboard/web_keyboard.js").WebKeyboard;
exports.DifferentialServos = require("./drivers/differential_servos.js").DifferentialServos;

var pairs = [];

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

  // Go through each defined pair and map them together
  mapping.forEach(function (pair) {
    var input = pair.input;
    var output = pair.output;
    var _pair$filter = pair.filter;
    var filter = _pair$filter === undefined ? [] : _pair$filter;

    if (input.defaults && output.defaults) {
      (function () {
        // Join the arrays together, sort them, then dedupe them
        var keys = Object.keys(input.defaults).concat(Object.keys(output.defaults)).sort();
        var dedupedKeys = [];
        keys.forEach(function (key) {
          if (dedupedKeys.indexOf(key) == -1) {
            dedupedKeys.push(key);
          }
        });
        dedupedKeys.forEach(function (key) {
          if (input.defaults[key] && output.defaults[key]) {
            pairs.push({
              input: input.defaults[key],
              output: output.defaults[key],
              filter: filter
            });
          }
        });
      })();
    } else if (input.type && output.type) {
      pairs.push({
        input: input,
        output: output,
        filter: filter
      });
    } else {
      throw new Error("Mismatched input/output pair. Inputs and outputs must both be either a full controller/driver, or single axis");
    }
  });
}

function run() {
  console.log(pairs);
}
//# sourceMappingURL=data:application/json;base64,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ImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG5UaGUgTUlUIExpY2Vuc2UgKE1JVClcblxuQ29weXJpZ2h0IChjKSAyMDE1IEJyeWFuIEh1Z2hlcyA8YnJ5YW5AdGhlb3JldGljYWxpZGVhdGlvbnMuY29tPlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG5vZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5pbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG50byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG5jb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbmZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG5hbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG5GSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbkFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbkxJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG5PVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG5USEUgU09GVFdBUkUuXG4qL1xuXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbmltcG9ydCBldmVudHMgZnJvbSAnZXZlbnRzJztcbmltcG9ydCAnZXM2LXN5bWJvbC9pbXBsZW1lbnQnO1xuXG5leHBvcnQgeyBXZWJLZXlib2FyZCB9IGZyb20gJy4vY29udHJvbGxlcnMvd2ViX2tleWJvYXJkL3dlYl9rZXlib2FyZC5qcyc7XG5leHBvcnQgeyBEaWZmZXJlbnRpYWxTZXJ2b3MgfSBmcm9tICcuL2RyaXZlcnMvZGlmZmVyZW50aWFsX3NlcnZvcy5qcyc7XG5cbmxldCBwYWlycyA9IFtdO1xuXG5leHBvcnQgZnVuY3Rpb24gY29ubmVjdChtYXBwaW5nLCBkcml2ZXIpIHtcblxuICAvLyBJZiB0d28gYXJndW1lbnRzIHdlcmUgcGFzc2VkIGluLCBhc3N1bWUgdGhhdCB0aGV5IGFyZSBhIGNvbnRyb2xsZXIvZHJpdmVyIHBhaXJcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikge1xuICAgIG1hcHBpbmcgPSB7XG4gICAgICBpbnB1dDogbWFwcGluZyxcbiAgICAgIG91dHB1dDogZHJpdmVyXG4gICAgfTtcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoICE9IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbnVtYmVyIG9mIGFyZ3VtZW50cyBwYXNzZWQgdG8gXCJjb25uZWN0XCInKTtcbiAgfVxuXG4gIGlmICghQXJyYXkuaXNBcnJheShtYXBwaW5nKSkge1xuICAgIG1hcHBpbmcgPSBbIG1hcHBpbmcgXTtcbiAgfVxuXG4gIC8vIEdvIHRocm91Z2ggZWFjaCBkZWZpbmVkIHBhaXIgYW5kIG1hcCB0aGVtIHRvZ2V0aGVyXG4gIG1hcHBpbmcuZm9yRWFjaCgocGFpcikgPT4ge1xuICAgIGxldCB7IGlucHV0LCBvdXRwdXQsIGZpbHRlciA9IFtdIH0gPSBwYWlyO1xuICAgIGlmIChpbnB1dC5kZWZhdWx0cyAmJiBvdXRwdXQuZGVmYXVsdHMpIHtcbiAgICAgIC8vIEpvaW4gdGhlIGFycmF5cyB0b2dldGhlciwgc29ydCB0aGVtLCB0aGVuIGRlZHVwZSB0aGVtXG4gICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKGlucHV0LmRlZmF1bHRzKS5jb25jYXQoT2JqZWN0LmtleXMob3V0cHV0LmRlZmF1bHRzKSkuc29ydCgpO1xuICAgICAgbGV0IGRlZHVwZWRLZXlzID0gW107XG4gICAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAoZGVkdXBlZEtleXMuaW5kZXhPZihrZXkpID09IC0xKSB7XG4gICAgICAgICAgZGVkdXBlZEtleXMucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGRlZHVwZWRLZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBpZiAoaW5wdXQuZGVmYXVsdHNba2V5XSAmJiBvdXRwdXQuZGVmYXVsdHNba2V5XSkge1xuICAgICAgICAgIHBhaXJzLnB1c2goe1xuICAgICAgICAgICAgaW5wdXQ6IGlucHV0LmRlZmF1bHRzW2tleV0sXG4gICAgICAgICAgICBvdXRwdXQ6IG91dHB1dC5kZWZhdWx0c1trZXldLFxuICAgICAgICAgICAgZmlsdGVyOiBmaWx0ZXJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpbnB1dC50eXBlICYmIG91dHB1dC50eXBlKSB7XG4gICAgICBwYWlycy5wdXNoKHtcbiAgICAgICAgaW5wdXQ6IGlucHV0LFxuICAgICAgICBvdXRwdXQ6IG91dHB1dCxcbiAgICAgICAgZmlsdGVyOiBmaWx0ZXJcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc21hdGNoZWQgaW5wdXQvb3V0cHV0IHBhaXIuIElucHV0cyBhbmQgb3V0cHV0cyBtdXN0IGJvdGggYmUgZWl0aGVyIGEgZnVsbCBjb250cm9sbGVyL2RyaXZlciwgb3Igc2luZ2xlIGF4aXMnKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuKCkge1xuICBjb25zb2xlLmxvZyhwYWlycyk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=