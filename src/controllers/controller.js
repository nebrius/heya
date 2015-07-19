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
import { types, inputTypes } from '../constants.js';
import { directionToAxes } from '../filters/direction_to_axes/direction_to_axes.js'

const handleDigital2DDirection = Symbol('handleDigital2DDirection');

export function createController(spec) {
  if (typeof spec.initialize != 'function' ||  typeof spec.connect != 'function') {
    throw new Error('Invalid controller definition');
  }

  class Controller extends EventEmitter {

    // Initializes the controller. This calls the definition's initialization
    // method, which is supposed to create the inputs object
    constructor(...opts) {
      super();
      spec.initialize(...opts);

      this.type = types.CONTROLLER;
      this.inputs = {};

      const inputs = spec.inputs;
      if (!inputs || typeof inputs != 'object') {
        throw new Error('Invalid inputs for ' + (spec.name || 'unnamed controller'));
      }
      for (let input in inputs) {
        if (inputs.hasOwnProperty(input)) {
          switch (inputs[input].type) {
            case inputTypes.DIGITAL_2D_DIRECTION:
              this[handleDigital2DDirection](input, inputs[input]);
              break;
            default:
              throw new Error('Unknown controller input type "' + inputs[input].type + '"');
          }
        }
      }
    }

    connect() {
      spec.connect();
    }

    [handleDigital2DDirection](name, input) {
      this.inputs[name] = {
        x: {
          name: name + '_x',
          type: types.ANALOG,
          source: this
        },
        y: {
          name: name + '_y',
          type: types.ANALOG,
          source: this
        }
      };
      input.on('change', (direction) => {
        const { x, y } = directionToAxes(direction);
        this.emit('change', [{
          source: name + '_x',
          value: x
        }, {
          source: name + '_y',
          value: y
        }]);
      });
    }
  }

  return Controller;
}