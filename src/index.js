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

import { EventEmitter } from 'events';
import async from 'async';
import events from 'events';
import 'es6-symbol/implement';

export { WebKeyboard } from './controllers/web_keyboard/web_keyboard.js';
export { DifferentialServos } from './drivers/differential_servos.js';

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

  // Go through each defined pair and map them together
  mapping.forEach((pair) => {
    let { input, output, filter = [] } = pair;
    if (input.defaults && output.defaults) {
      // Join the arrays together, sort them, then dedupe them
      let keys = Object.keys(input.defaults).concat(Object.keys(output.defaults)).sort();
      let dedupedKeys = [];
      keys.forEach((key) => {
        if (dedupedKeys.indexOf(key) == -1) {
          dedupedKeys.push(key);
        }
      });
      dedupedKeys.forEach((key) => {
        if (input.defaults[key] && output.defaults[key]) {
          pairs.push({
            input: input.defaults[key],
            output: output.defaults[key],
            filter: filter
          });
        }
      });
    } else if (input.type && output.type) {
      pairs.push({
        input: input,
        output: output,
        filter: filter
      });
    } else {
      throw new Error('Mismatched input/output pair. Inputs and outputs must both be either a full controller/driver, or single axis');
    }
  });
}

export function run() {
  console.log(pairs);
}
