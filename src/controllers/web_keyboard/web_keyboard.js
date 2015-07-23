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
import fs from 'fs';
import http from 'http';
import path from 'path';
import { createController, types } from '../controller.js';
import logger from '../../logging.js';

const options = Symbol('options');
const direction = Symbol('direction');

export const WebKeyboard = createController({

  name: 'WebKeyboard',

  initialize(opts = {}) {
    this[options] = opts;

    this[direction] = new EventEmitter();
    this[direction].type = types.DIGITAL_2D_DIRECTION;

    this.inputs = {
      direction: this[direction]
    };
  },

  connect(cb) {
    const webpage = fs.readFileSync(path.join(__dirname, 'control.html')).toString();
    const port = this[options].port || 8000;
    http.createServer((req, res) => {
      const url = require('url').parse(req.url);
      const move = url.path.match(/^\/move\/(.*)$/);
      if (move) {
        this[direction].emit('change', move[1]);
        res.end();
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(webpage);
      }
    }).listen(port, 'localhost', () => {
      logger.info(`Open your browser and point it to http://localhost:${port} to control the bot`);
      cb();
    });
  }
});
