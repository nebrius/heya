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
import gamepad from 'gamepad';
import { inputTypes } from '../../constants.js';
import { createController } from '../controller.js';
import logger from '../../logging.js';

const options = Symbol('options');
const deviceId = Symbol('deviceId');
const axisInputMap = Symbol('axisInputMap');
const buttonInputMap = Symbol('buttonInputMap');
const createAnalog1DInput = Symbol('handleAnalog1DInput');
const createAnalog2DInput = Symbol('createAnalog2DInput');
const createButtonInput = Symbol('createButtonInput');

export const Gamepad = createController({

  name: 'Gamepad',

  constants: {
    CYBORG_EVO: {
      axes: {
        primary: [ 0, 1 ],
        yaw: [ 2 ],
        throttle: [ 3 ]
      },
      buttons: {
        trigger: 0,
        button1: 1,
        button2: 2,
        button3: 3,
        p1: 6
      }
    },
    XBOX_360: {
      axes: {
        leftThumbstick: [ 0, 1 ],
        rightThumbstick: [ 2, 3 ]
      },
      buttons: {}
    }
  },

  initialize(opts) {
    this[options] = opts;

    if (!opts || !opts.type || typeof opts.type.axes !== 'object' || typeof opts.type.buttons != 'object') {
      throw new Error('The device type map was not supplied or is invalid');
    }
    const axes = opts.type.axes;
    const buttons = opts.type.buttons;

    this[deviceId] = opts.id || 0;
    logger.debug(`Gamepad is listening for events from device ${this[deviceId]}`);

    this[axisInputMap] = [];
    this.inputs = {};

    let axis; // eslint and babel disagree on whether to use let or const inline in the for...in
    for (axis in axes) {
      if (!axes.hasOwnProperty(axis)) {
        continue;
      }
      let createHelper;
      switch (axes[axis].length) {
        case 1:
          createHelper = this[createAnalog1DInput];
          break;
        case 2:
          createHelper = this[createAnalog2DInput];
          break;
        default:
          throw new Error('Axis maps must have 1 or 2 entries, not ' + axes[axis].length);
      }
      this.inputs[axis] = createHelper.call(this, axes[axis]);
    }

    let button;
    for (button in buttons) {
      if (!axes.hasOwnProperty(axis)) {
        continue;
      }
      this.inputs[button] = this[createButtonInput](button);
    }
  },

  [createAnalog1DInput](axisMap) {
    const emitter = Object.assign(new EventEmitter(), {
      type: inputTypes.ANALOG_1D_DIRECTION,
      updateValue(axis, newValue) {
        this.emit('change', newValue);
      }
    });
    this[axisInputMap][axisMap[0]] = emitter;
    return emitter;
  },

  [createAnalog2DInput](axesMap) {
    const currentValue = {
      x: 0,
      y: 0
    };
    const emitter = Object.assign(new EventEmitter(), {
      type: inputTypes.ANALOG_2D_DIRECTION,
      updateValue(axis, newValue) {
        if (axis == axesMap[0]) {
          currentValue.x = newValue;
        } else {
          currentValue.y = newValue;
        }
        this.emit('change', currentValue);
      }
    });
    this[axisInputMap][axesMap[0]] = emitter;
    this[axisInputMap][axesMap[1]] = emitter;
    return emitter;
  },

  [createButtonInput](num) {
    const emitter = Object.assign(new EventEmitter(), {
      type: inputTypes.BINARY_STATE,
      setValue() {
        this.emit('change', true);
      },
      clearValue() {
        this.emit('change', false);
      }
    });
    this[buttonInputMap][num] = emitter;
    return emitter;
  },

  connect(cb) {
    // Initialize the library
    gamepad.init();

    // List the state of all currently attached devices
    for (let i = 0; i < gamepad.numDevices(); i++) {
      logger.debug(`Found gamepad device ${gamepad.deviceAtIndex(i)}`);
    }

    // Create a game loop and poll for events
    setInterval(gamepad.processEvents, 16);

    // Scan for new gamepads as a slower rate
    setInterval(gamepad.detectDevices, 500);

    // Listen for move events on all gamepads
    gamepad.on('move', (id, axis, value) => {
      if (id != this[deviceId]) {
        return;
      }
      if (this[axisInputMap][axis]) {
        this[axisInputMap][axis].updateValue(axis, value);
      }
    });

    // Listen for button up events on all gamepads
    gamepad.on('up', (id, num) => {
      if (id != this[deviceId]) {
        return;
      }
      if (this[buttonInputMap][num]) {
        this[buttonInputMap][num].setValue();
      }
    });

    // Listen for button down events on all gamepads
    gamepad.on('down', (id, num) => {
      if (id != this[deviceId]) {
        return;
      }
      if (this[buttonInputMap][num]) {
        this[buttonInputMap][num].clearValue();
      }
    });

    cb();

    /*
    down { id: 0, num: 1 }
    up { id: 0, num: 1 }
    down { id: 0, num: 3 }
    up { id: 0, num: 3 }
    down { id: 0, num: 2 }
    up { id: 0, num: 2 }
    move { id: 0, axis: 1, value: 0.004887580871582031 }
    move { id: 0, axis: 1, value: 0.008797645568847656 }
    move { id: 0, axis: 1, value: 0.010752677917480469 }
    */
  }
});
