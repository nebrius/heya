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
import { types as interimTypes } from '../constants.js';
import directionToAxes from '../filters/direction_to_axes/direction_to_axes.js';
import logger from '../logging.js';

export const types = Object.freeze({
  BINARY_STATE: 'BINARY_STATE',
  DIGITAL_2D_DIRECTION: 'DIGITAL_2D_DIRECTION',
  ANALOG_1D_DIRECTION: 'ANALOG_1D_DIRECTION',
  ANALOG_2D_DIRECTION: 'ANALOG_2D_DIRECTION'
});

const handleDigital2DDirection = Symbol('handleDigital2DDirection');
const handleAnalog1DDirection = Symbol('handleAnalog1DDirection');
const handleAnalog2DDirection = Symbol('handleAnalog2DDirection');
const handleBinaryState = Symbol('handleBinaryState');
const armed = Symbol('armed');

export function createController(spec) {
  if (typeof spec.initialize != 'function' || typeof spec.connect != 'function') {
    throw new Error('Invalid controller definition');
  }
  logger.debug(`Creating controller ${spec.name}`);

  class Controller extends EventEmitter {

    constructor(...opts) {
      super();
      spec.initialize(...opts);

      this.type = interimTypes.CONTROLLER;
      this.inputs = {};
      this.name = spec.name;

      const inputs = spec.inputs;
      if (!inputs || typeof inputs != 'object') {
        throw new Error(`Invalid inputs for ${spec.name || 'unnamed controller'}`);
      }
      let input; // eslint and babel disagree on whether to use let or const inline in the for...in
      for (input in inputs) {
        if (inputs.hasOwnProperty(input)) {
          switch (inputs[input].type) {
            case types.DIGITAL_2D_DIRECTION:
              this[handleDigital2DDirection](input, inputs[input]);
              break;
            case types.ANALOG_1D_DIRECTION:
              this[handleAnalog1DDirection](input, inputs[input]);
              break;
            case types.ANALOG_2D_DIRECTION:
              this[handleAnalog2DDirection](input, inputs[input]);
              break;
            case types.BINARY_STATE:
              this[handleBinaryState](input, inputs[input]);
              break;
            default:
              throw new Error(`Unknown controller input type "${inputs[input].type}"`);
          }
        }
      }
    }

    connect(cb) {
      spec.connect(cb);
    }

    arm() {
      this[armed] = true;
    }

    [handleAnalog1DDirection](name, input) {
      logger.debug(`Wiring up analog 1D direction for controller ${spec.name}`);
      const axisEmitter = Object.assign(new EventEmitter(), {
        name,
        type: interimTypes.ANALOG,
        source: this
      });
      this[name] = axisEmitter;
      input.on('change', (value) => {
        if (this[armed]) {
          logger.trace(`Controller ${spec.name} emitted analog 1D direction value ${value}`);
          axisEmitter.emit('change', value);
        }
      });
    }

    [handleAnalog2DDirection](name, input) {
      logger.debug(`Wiring up analog 2D direction for controller ${spec.name}`);
      const xEmitter = Object.assign(new EventEmitter(), {
        name: name + '_x',
        type: interimTypes.ANALOG,
        source: this
      });
      const yEmitter = Object.assign(new EventEmitter(), {
        name: name + '_y',
        type: interimTypes.ANALOG,
        source: this
      });
      this[name] = {
        x: xEmitter,
        y: yEmitter
      };
      input.on('change', ({ x, y }) => {
        if (this[armed]) {
          logger.trace(`Controller ${spec.name} emitted analog 2D direction value (${x}, ${y})`);
          xEmitter.emit('change', x);
          yEmitter.emit('change', y);
        }
      });
    }

    [handleDigital2DDirection](name, input) {
      logger.debug(`Wiring up digital 2D direction for controller ${spec.name}`);
      const xEmitter = Object.assign(new EventEmitter(), {
        name: name + '_x',
        type: interimTypes.ANALOG,
        source: this
      });
      const yEmitter = Object.assign(new EventEmitter(), {
        name: name + '_y',
        type: interimTypes.ANALOG,
        source: this
      });
      this[name] = {
        x: xEmitter,
        y: yEmitter
      };
      input.on('change', (direction) => {
        if (this[armed]) {
          logger.trace(`Controller ${spec.name} emitted digital 2D direction value ${direction}`);
          const { x, y } = directionToAxes(direction);
          xEmitter.emit('change', x);
          yEmitter.emit('change', y);
        }
      });
    }

    [handleBinaryState](name, input) {
    }
  }

  if (spec.constants) {
    Object.assign(Controller, spec.constants);
  }

  return Controller;
}
