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

import { types, inputTypes, outputTypes } from './constants.js';
import { EventEmitter } from 'events';
import async from 'async';
import events from 'events';
import 'es6-symbol/implement';

export { WebKeyboard } from './controllers/web_keyboard/web_keyboard.js';
export { DifferentialServos } from './drivers/differential_servos/differential_servos.js';

let pairs = [];

export function connect(mapping, driver) {

  // If two arguments were passed in, assume that they are a controller/driver pair
  if (arguments.length == 2) {
    mapping = {
      input: mapping,
      output: driver
    };
  } else if (arguments.length != 1) {
    throw new Error('Invalid number of arguments passed to "connect"');
  }
  if (!Array.isArray(mapping)) {
    mapping = [ mapping ];
  }
  mapping.forEach(({ input, output, filters=[] }) => {
    function connectPair(input, output, filters) {
      input.source.on('change', (data) => {
        output.respond(filters.reduce((data, filter) => {
          return filter(data);
        }, data));
      });
    }
    if (input.type == types.CONTROLLER && output.type == types.DRIVER) {
      // TODO: map controller and driver defaults
    } else if (input.type && input.type == output.type) {
      connectPair(input, output, filters);
    } else {
      throw new Error('Invalid input/output pair. Each pair must either be a controller and driver, or have the same source type');
    }
  });
}

export function run(cb) {
  async.parallel(pairs.map(({ input, output, filters }) => {
    return function(next) {
      async.parallel([
        (next) => { input.connect(next); },
        (next) => { output.connect(next); }
      ], (err) => {
        if (err) {
          next(err);
          return;
        }
        input.on('move', (...args) => {
          output.move(filters.reduce((currentData, filter) => {
            return filter(...currentData);
          }, args));
        })
      })
    }
  }), cb);
}
