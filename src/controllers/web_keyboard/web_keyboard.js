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

import events from 'events';
import fs from 'fs'
import util from 'util';
import http from 'http';

import { directionToAxes } from '../../utils.js';
import { inputTypes } from '../../constants.js';

var options = Symbol('options');

export class WebKeyboard {

  constructor(opts = {}) {
    this[options] = opts;

    this.x = new events.EventEmitter();
    this.y = new events.EventEmitter();
    this.x.type = this.y.type = inputTypes.ANALOG_AXIS;

    this.defaults = {
      x: this.x,
      y: this.y
    };
  }

  /*connect(cb) {
    var webpage = require('fs').readFileSync(__dirname + '/control.html').toString();
    var port = this[options].port || 8000;
    http.createServer((req, res) => {
      var url = require('url').parse(req.url);
      var move = url.path.match(/^\/move\/(.*)$/);
      if (move) {
        let { x, y } = directionToAxes(move);
        this[xAxis].emit(move, x);
        this[yAxis].emit(move, y);
        res.end();
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(webpage);
      }
    }).listen(port, 'localhost', () => {
      cb();
      console.log('Open your browser and point it to http://localhost:' +
        port + ' to control the bot');
    });
  }*/
}
