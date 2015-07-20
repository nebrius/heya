"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

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

var types = require("./constants.js").types;

var logger = _interopRequire(require("./logging.js"));

var async = _interopRequire(require("async"));

require("es6-symbol/implement");

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
    input.source.on("change", function (data) {
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
  return;
  async.parallel(pairs.map(function (_ref) {
    var input = _ref.input;
    var output = _ref.output;
    var filters = _ref.filters;

    return function (next) {
      async.parallel([function (next) {
        input.connect(next);
      }, function (next) {
        output.connect(next);
      }], function (err) {
        if (err) {
          next(err);
          return;
        }
        input.on("move", function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          output.move(filters.reduce(function (currentData, filter) {
            return filter.apply(undefined, _toConsumableArray(currentData));
          }, args));
        });
      });
    };
  }), cb);
}

// TODO: map controller and driver defaults
//# sourceMappingURL=data:application/json;base64,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Q2hELFdBQU8sVUFBUyxJQUFJLEVBQUU7QUFDcEIsV0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUNiLFVBQUMsSUFBSSxFQUFLO0FBQUUsYUFBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUFFLEVBQ2xDLFVBQUMsSUFBSSxFQUFLO0FBQUUsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUFFLENBQ3BDLEVBQUUsVUFBQyxHQUFHLEVBQUs7QUFDVixZQUFJLEdBQUcsRUFBRTtBQUNQLGNBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNWLGlCQUFPO1NBQ1I7QUFDRCxhQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFhOzRDQUFULElBQUk7QUFBSixnQkFBSTs7O0FBQ3ZCLGdCQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFLO0FBQ2xELG1CQUFPLE1BQU0scUNBQUksV0FBVyxFQUFDLENBQUM7V0FDL0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ1gsQ0FBQyxDQUFDO09BQ0osQ0FBQyxDQUFDO0tBQ0osQ0FBQztHQUNILENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztDQUNUIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXG5Db3B5cmlnaHQgKGMpIDIwMTUgQnJ5YW4gSHVnaGVzIDxicnlhbkB0aGVvcmV0aWNhbGlkZWF0aW9ucy5jb20+XG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbm9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbmluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbnRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbmNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbmFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG5JTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbkZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbk9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cblRIRSBTT0ZUV0FSRS5cbiovXG5cbmltcG9ydCB7IHR5cGVzIH0gZnJvbSAnLi9jb25zdGFudHMuanMnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuL2xvZ2dpbmcuanMnO1xuaW1wb3J0IGFzeW5jIGZyb20gJ2FzeW5jJztcbmltcG9ydCAnZXM2LXN5bWJvbC9pbXBsZW1lbnQnO1xuXG5leHBvcnQgeyBXZWJLZXlib2FyZCB9IGZyb20gJy4vY29udHJvbGxlcnMvd2ViX2tleWJvYXJkL3dlYl9rZXlib2FyZC5qcyc7XG5leHBvcnQgeyBEaWZmZXJlbnRpYWxTZXJ2b3MgfSBmcm9tICcuL2RyaXZlcnMvZGlmZmVyZW50aWFsX3NlcnZvcy9kaWZmZXJlbnRpYWxfc2Vydm9zLmpzJztcblxuY29uc3QgYm90cyA9IG5ldyBTZXQoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbm5lY3QobWFwcGluZywgZHJpdmVyKSB7XG4gIC8vIElmIHR3byBhcmd1bWVudHMgd2VyZSBwYXNzZWQgaW4sIGFzc3VtZSB0aGF0IHRoZXkgYXJlIGEgY29udHJvbGxlci9kcml2ZXIgcGFpclxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSB7XG4gICAgbWFwcGluZyA9IHtcbiAgICAgIGlucHV0OiBtYXBwaW5nLFxuICAgICAgb3V0cHV0OiBkcml2ZXJcbiAgICB9O1xuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBudW1iZXIgb2YgYXJndW1lbnRzIHBhc3NlZCB0byBcImNvbm5lY3RcIicpO1xuICB9XG4gIGlmICghQXJyYXkuaXNBcnJheShtYXBwaW5nKSkge1xuICAgIG1hcHBpbmcgPSBbIG1hcHBpbmcgXTtcbiAgfVxuXG4gIC8vIEhlbHBlciBtZXRob2QgZm9yIGNvbm5lY3RpbmcgYW4gaW5wdXQvb3V0cHV0IHBhaXJcbiAgZnVuY3Rpb24gY29ubmVjdFBhaXIoaW5wdXQsIG91dHB1dCwgZmlsdGVycykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgQ29ubmVjdGluZyAke2lucHV0Lm5hbWV9IGluICR7aW5wdXQuc291cmNlLm5hbWV9IHRvICR7b3V0cHV0Lm5hbWV9IGluICR7b3V0cHV0LnNvdXJjZS5uYW1lfWApO1xuICAgIGlucHV0LnNvdXJjZS5vbignY2hhbmdlJywgKGRhdGEpID0+IHtcbiAgICAgIG91dHB1dC5yZXNwb25kKGZpbHRlcnMucmVkdWNlKChmaWx0ZXJlZERhdGEsIGZpbHRlcikgPT4ge1xuICAgICAgICByZXR1cm4gZmlsdGVyKGZpbHRlcmVkRGF0YSk7XG4gICAgICB9LCBkYXRhKSk7XG4gICAgfSk7XG4gICAgYm90cy5hZGQoaW5wdXQuc291cmNlKTtcbiAgICBib3RzLmFkZChvdXRwdXQuc291cmNlKTtcbiAgfVxuXG4gIC8vIExvb3AgdGhyb3VnaCBlYWNoIGlucHV0L291dHB1dCBwYWlyIGFuZCBtYXAgdGhlbVxuICBtYXBwaW5nLmZvckVhY2goKHsgaW5wdXQsIG91dHB1dCwgZmlsdGVycz1bXSB9KSA9PiB7XG4gICAgaWYgKGlucHV0LnR5cGUgPT0gdHlwZXMuQ09OVFJPTExFUiAmJiBvdXRwdXQudHlwZSA9PSB0eXBlcy5EUklWRVIpIHtcbiAgICAgIC8vIFRPRE86IG1hcCBjb250cm9sbGVyIGFuZCBkcml2ZXIgZGVmYXVsdHNcbiAgICB9IGVsc2UgaWYgKGlucHV0LnR5cGUgJiYgaW5wdXQudHlwZSA9PSBvdXRwdXQudHlwZSkge1xuICAgICAgY29ubmVjdFBhaXIoaW5wdXQsIG91dHB1dCwgZmlsdGVycyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnB1dC9vdXRwdXQgcGFpci4gRWFjaCBwYWlyIG11c3QgZWl0aGVyIGJlIGEgY29udHJvbGxlciBhbmQgZHJpdmVyLCBvciBoYXZlIHRoZSBzYW1lIHNvdXJjZSB0eXBlJyk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJ1bihjYikge1xuICBsb2dnZXIuZGVidWcoYENvbm5lY3RpbmcgdG8gJHtib3RzLnNpemV9IGJvdHNgKTtcbiAgcmV0dXJuO1xuICBhc3luYy5wYXJhbGxlbChwYWlycy5tYXAoKHsgaW5wdXQsIG91dHB1dCwgZmlsdGVycyB9KSA9PiB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKG5leHQpIHtcbiAgICAgIGFzeW5jLnBhcmFsbGVsKFtcbiAgICAgICAgKG5leHQpID0+IHsgaW5wdXQuY29ubmVjdChuZXh0KTsgfSxcbiAgICAgICAgKG5leHQpID0+IHsgb3V0cHV0LmNvbm5lY3QobmV4dCk7IH1cbiAgICAgIF0sIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIG5leHQoZXJyKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXQub24oJ21vdmUnLCAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIG91dHB1dC5tb3ZlKGZpbHRlcnMucmVkdWNlKChjdXJyZW50RGF0YSwgZmlsdGVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyKC4uLmN1cnJlbnREYXRhKTtcbiAgICAgICAgICB9LCBhcmdzKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSksIGNiKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==