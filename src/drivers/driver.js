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

import { types, outputTypes } from '../constants.js';
import { axesToDifferential } from '../filters/axes_to_differential/axes_to_differential.js';
import logger from '../logging.js';

const setupAnalog2DDifferential = Symbol('setupAnalog2DDifferential');

export function createDriver(spec) {
  if (typeof spec.initialize != 'function' || typeof spec.connect != 'function') {
    throw new Error('Invalid driver definition');
  }
  logger.debug(`Creating driver ${spec.name}`);

  class Driver {
    constructor(...opts) {
      spec.initialize(...opts);

      this.type = types.DRIVER;
      this.outputs = {};
      this.name = spec.name;

      const outputs = spec.outputs;
      if (!outputs || typeof outputs != 'object') {
        throw new Error(`Invalid outputs for ${spec.name || 'unnamed driver'}`);
      }
      let output; // eslint and babel disagree on whether to use let or const inline in the for...in
      for (output in outputs) {
        if (outputs.hasOwnProperty(output)) {
          switch (outputs[output].type) {
            case outputTypes.ANALOG_2D_DIFFERENTIAL:
              this[setupAnalog2DDifferential](output, outputs[output]);
              break;
            default:
              throw new Error(`Unknown driver input type ${outputs[output].type}"`);
          }
        }
      }
    }

    connect(cb) {
      spec.connect(cb);
    }

    [setupAnalog2DDifferential](name, output) {
      logger.debug(`Wiring up digital 2D direction for controller ${spec.name}`);

      let xValue;
      let yValue;
      let isResponding = false;
      function respond() {
        if (!isResponding) {
          isResponding = true;
          setImmediate(() => {
            isResponding = false;
            logger.debug(`Analog 2D differential value changed to (${xValue},${yValue}) to driver ${spec.name}`);
            const { left, right } = axesToDifferential(xValue, yValue);
            output.respond(left, right);
          });
        }
      }

      const leftOutput = {
        name: name + '_left',
        type: types.ANALOG,
        source: this,
        respond: (data) => {
          xValue = data;
          respond();
        }
      };
      const rightOutput = {
        name: name + '_right',
        type: types.ANALOG,
        source: this,
        respond: (data) => {
          yValue = data;
          respond();
        }
      };
      this.outputs[name] = {
        left: leftOutput,
        right: rightOutput
      };
    }
  }

  return Driver;
}
