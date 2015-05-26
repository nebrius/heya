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

var EventEmitter = require('events').EventEmitter;
var async = require('async');

module.exports = {
  controllers: {
    DigitalJoystick: require('./controllers/digital_joystick/digital_joystick.js'),
    WebKeyboard: require('./controllers/web_keyboard/web_keyboard.js')
  },
  drivers: {
    PawelBot: require('./drivers/pawel_bot.js'),
    RemotePawelBot: require('./drivers/remote_pawel_bot.js')
  },
  create: create
};

function create(options) {
  if (typeof options != 'object') {
    throw new Error('Invalid options');
  }

  var controller = options.controller;
  var driver = options.driver;
  if (!(controller instanceof EventEmitter) || !controller.connect) {
    throw new Error('Invalid controller');
  }
  if (typeof driver != 'object' || !driver.connect || !driver.move) {
    throw new Error('Invalid driver');
  }

  async.series([
    function(next) {
      controller.connect(function() {
        console.log('Controller connected');
        next();
      });
    },
    function(next) {
      driver.connect(function() {
        console.log('Driver connected');
        next();
      });
    }
  ], function() {
    console.log('Sumobot ready!');
    controller.on('move', function(direction) {
      console.log('Direction (' + direction.x + ',' + direction.y + ')');
      driver.move(direction.x, direction.y);
    });
  });
}
