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

import { createDriver, types } from '../driver.js';
import five from 'johnny-five';

const options = Symbol('options');
const leftServo = Symbol('leftServo');
const rightServo = Symbol('rightServo');

let idCounter = 1;

export const DifferentialServos = createDriver({

  name: 'DifferentialServos',

  initialize(opts) {
    this[options] = opts;

    const wheels = {
      type: types.ANALOG_2D_DIFFERENTIAL,
      respond: (left, right) => {
        if (left < 1) {
          this[leftServo].ccw(-left);
        } else {
          this[leftServo].cw(left);
        }
        if (right < 1) {
          this[rightServo].cw(-right);
        } else {
          this[rightServo].ccw(right);
        }
      }
    };

    this.outputs = {
      wheels
    };
  },

  connect(cb) {
    const id = `differential_servos_${idCounter++}}`;
    const board = new five.Board({
      repl: false,
      io: this[options].io,
      id
    });

    board.on('ready', () => {
      this[leftServo] = new five.Servo({
        pin: this[options].leftServo,
        type: 'continuous',
        id
      });

      this[rightServo] = new five.Servo({
        pin: this[options].rightServo,
        type: 'continuous',
        id
      });

      this[leftServo].stop();
      this[rightServo].stop();

      cb();
    });
  }
});
