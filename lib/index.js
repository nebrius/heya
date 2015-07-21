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

    if (input.type == types.CONTROLLER && output.type == types.DRIVER) {} else if (input.type && input.type == output.type) {
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

// TODO: map controller and driver defaults
//# sourceMappingURL=data:application/json;base64,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LENBQUMsRUFBRSxZQUFNO0FBQy9FLFVBQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNuQyxNQUFFLEVBQUUsQ0FBQztHQUNOLENBQUMsQ0FBQztDQUNKIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTUgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCAnYmFiZWwvcG9seWZpbGwnO1xuaW1wb3J0IHsgdHlwZXMgfSBmcm9tICcuL2NvbnN0YW50cy5qcyc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2luZy5qcyc7XG5pbXBvcnQgYXN5bmMgZnJvbSAnYXN5bmMnO1xuXG5leHBvcnQgeyBXZWJLZXlib2FyZCB9IGZyb20gJy4vY29udHJvbGxlcnMvd2ViX2tleWJvYXJkL3dlYl9rZXlib2FyZC5qcyc7XG5leHBvcnQgeyBEaWZmZXJlbnRpYWxTZXJ2b3MgfSBmcm9tICcuL2RyaXZlcnMvZGlmZmVyZW50aWFsX3NlcnZvcy9kaWZmZXJlbnRpYWxfc2Vydm9zLmpzJztcblxuY29uc3QgYm90cyA9IG5ldyBTZXQoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3QobWFwcGluZywgZHJpdmVyKSB7XG4gIC8vIElmIHR3byBhcmd1bWVudHMgd2VyZSBwYXNzZWQgaW4sIGFzc3VtZSB0aGF0IHRoZXkgYXJlIGEgY29udHJvbGxlci9kcml2ZXIgcGFpclxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSB7XG4gICAgbWFwcGluZyA9IHtcbiAgICAgIGlucHV0OiBtYXBwaW5nLFxuICAgICAgb3V0cHV0OiBkcml2ZXJcbiAgICB9O1xuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBudW1iZXIgb2YgYXJndW1lbnRzIHBhc3NlZCB0byBcImNvbm5lY3RcIicpO1xuICB9XG4gIGlmICghQXJyYXkuaXNBcnJheShtYXBwaW5nKSkge1xuICAgIG1hcHBpbmcgPSBbIG1hcHBpbmcgXTtcbiAgfVxuXG4gIC8vIEhlbHBlciBtZXRob2QgZm9yIGNvbm5lY3RpbmcgYW4gaW5wdXQvb3V0cHV0IHBhaXJcbiAgZnVuY3Rpb24gY29ubmVjdFBhaXIoaW5wdXQsIG91dHB1dCwgZmlsdGVycykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ29ubmVjdGluZyAke2lucHV0Lm5hbWV9IGluICR7aW5wdXQuc291cmNlLm5hbWV9IHRvICR7b3V0cHV0Lm5hbWV9IGluICR7b3V0cHV0LnNvdXJjZS5uYW1lfWApO1xuICAgIGlucHV0Lm9uKCdjaGFuZ2UnLCAoZGF0YSkgPT4ge1xuICAgICAgb3V0cHV0LnJlc3BvbmQoZmlsdGVycy5yZWR1Y2UoKGZpbHRlcmVkRGF0YSwgZmlsdGVyKSA9PiB7XG4gICAgICAgIHJldHVybiBmaWx0ZXIoZmlsdGVyZWREYXRhKTtcbiAgICAgIH0sIGRhdGEpKTtcbiAgICB9KTtcbiAgICBib3RzLmFkZChpbnB1dC5zb3VyY2UpO1xuICAgIGJvdHMuYWRkKG91dHB1dC5zb3VyY2UpO1xuICB9XG5cbiAgLy8gTG9vcCB0aHJvdWdoIGVhY2ggaW5wdXQvb3V0cHV0IHBhaXIgYW5kIG1hcCB0aGVtXG4gIG1hcHBpbmcuZm9yRWFjaCgoeyBpbnB1dCwgb3V0cHV0LCBmaWx0ZXJzPVtdIH0pID0+IHtcbiAgICBpZiAoaW5wdXQudHlwZSA9PSB0eXBlcy5DT05UUk9MTEVSICYmIG91dHB1dC50eXBlID09IHR5cGVzLkRSSVZFUikge1xuICAgICAgLy8gVE9ETzogbWFwIGNvbnRyb2xsZXIgYW5kIGRyaXZlciBkZWZhdWx0c1xuICAgIH0gZWxzZSBpZiAoaW5wdXQudHlwZSAmJiBpbnB1dC50eXBlID09IG91dHB1dC50eXBlKSB7XG4gICAgICBjb25uZWN0UGFpcihpbnB1dCwgb3V0cHV0LCBmaWx0ZXJzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGlucHV0L291dHB1dCBwYWlyLiBFYWNoIHBhaXIgbXVzdCBlaXRoZXIgYmUgYSBjb250cm9sbGVyIGFuZCBkcml2ZXIsIG9yIGhhdmUgdGhlIHNhbWUgc291cmNlIHR5cGUnKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcnVuKGNiKSB7XG4gIGxvZ2dlci5kZWJ1ZyhgQ29ubmVjdGluZyB0byAke2JvdHMuc2l6ZX0gYm90c2ApO1xuICBhc3luYy5wYXJhbGxlbChBcnJheS5mcm9tKGJvdHMpLm1hcCgoYm90KSA9PiAobmV4dCkgPT4gYm90LmNvbm5lY3QobmV4dCkpLCAoKSA9PiB7XG4gICAgbG9nZ2VyLmRlYnVnKCdBbGwgYm90cyBjb25uZWN0ZWQnKTtcbiAgICBjYigpO1xuICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==