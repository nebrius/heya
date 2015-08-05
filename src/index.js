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

import 'babel/polyfill';
import async from 'async';
import { types } from './constants.js';
import logger from './logging.js';
import invertAxis from './filters/invert_axis/invert_axis.js';

// Expose methods for creating drivers and controllers
export { createController } from './controllers/controller.js';
export { createDriver } from './drivers/driver.js';
export { createFilter } from './filters/filter.js';

// Expose constants
export { types, directions } from './constants.js';
export { types as inputTypes } from './controllers/controller.js';
export { types as outputTypes } from './drivers/driver.js';

// Expose built-in controllers
export { WebKeyboard } from './controllers/web_keyboard/web_keyboard.js';
export { Gamepad } from './controllers/gamepad/gamepad.js';

// Expose built-in drivers
export { DifferentialServos } from './drivers/differential_servos/differential_servos.js';

const bots = new Set();

export function connect(mapping) {
  if (!Array.isArray(mapping)) {
    mapping = [ mapping ];
  }

  // Helper method for connecting an input/output pair
  function connectPair(input, output, filters) {
    logger.debug(`Connecting ${input.name} in ${input.source.name} to ${output.name} in ${output.source.name}`);
    input.on('change', (data) => {
      output.respond(filters.reduce((filteredData, filter) => {
        return filter(filteredData);
      }, data));
    });
    bots.add(input.source);
    bots.add(output.source);
  }

  // Loop through each input/output pair and map them
  mapping.forEach(({ input, output, isInverted, filters=[] }) => {
    if (isInverted) {
      filters.unshift(invertAxis);
    }
    if (input.type == types.CONTROLLER && output.type == types.DRIVER) {
      throw new Error('Support for mapping default controller inputs to driver outputs is not yet supported');
    } else if (input.type && input.type == output.type) {
      connectPair(input, output, filters);
    } else {
      throw new Error('Invalid input/output pair. Each pair must either be a controller and driver, or have the same source type');
    }
  });
}

export function run(cb) {
  logger.debug(`Connecting to ${bots.size} bots`);
  async.parallel(Array.from(bots).map((bot) => (next) => bot.connect(next)), () => {
    logger.debug('All bots connected');
    bots.forEach((bot) => bot.arm());
    cb();
  });
}
