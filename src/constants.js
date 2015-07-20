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

export const types = Object.freeze({
  CONTROLLER: 'CONTROLLER',
  DRIVER: 'DRIVER',
  CONTROLLER_FILTER: 'CONTROLLER_FILTER',
  INTERMEDIATE_FILTER: 'INTERMEDIATE_FILTER',
  DRIVER_FILTER: 'DRIVER_FILTER',
  DIGITAL: 'DIGITAL',
  ANALOG: 'ANALOG'
});

export const inputTypes = Object.freeze({
  DIGITAL_2D_DIRECTION: 'DIGITAL_2D_DIRECTION'
});

export const outputTypes = Object.freeze({
  ANALOG_2D_DIFFERENTIAL: 'ANALOG_2D_DIFFERENTIAL'
});

export const directions = Object.freeze({
  UP: 'UP',
  UPRIGHT: 'UPRIGHT',
  RIGHT: 'RIGHT',
  DOWNRIGHT: 'DOWNRIGHT',
  DOWN: 'DOWN',
  DOWNLEFT: 'DOWNLEFT',
  LEFT: 'LEFT',
  UPLEFT: 'UPLEFT'
});
