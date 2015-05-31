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

//global.__HEYA_DEBUG = true;

import { EventEmitter } from 'events';
import async from 'async';
import events from 'events';

// Symbol shim
if (typeof global.Symbol == 'undefined') {
  global.Symbol = function(name) {
    name = name || Math.round((Math.random() * 10000)).toString();
    return '__$nbr_234508920_' + name + '$__';
  };
}

export { DigitalJoystick } from './controllers/digital_joystick/digital_joystick.js';
export { WebKeyboard } from './controllers/web_keyboard/web_keyboard.js';
export { PawelBot } from './drivers/pawel_bot.js';
export { RemotePawelBot } from './drivers/remote_pawel_bot.js';

export function create(options) {
  connect(options.controller, options.driver);
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

export function connect(mapping, driver) {

  console.log('# initial');
  console.log(mapping);
  console.log(driver);

  // If two arguments were passed in, assume that they are a controller/driver pair
  if (arguments.length == 2) {
    if (isController(mapping) && isDriver(driver)) {
      mapping = {
        input: mapping,
        output: driver
      };
    } else if (isDriver(mapping) && isController(driver)) {
      mapping = {
        input: driver,
        output: mapping
      }
    } else {
      throw new Error('Expected one controller and one driver to be passed in to "connect"');
    }
  } else if (arguments.length != 1) {
    throw new Error('Invalid number of arguments passed to "connect"');
  }

  console.log('# step 1');
  console.log(mapping);

  // If we are mapping a controller to a driver, not specific axes, determine the
  // axes from each and map them to each other
  if (mapping.input && mapping.output) {
    mapping = getMapping(mapping.input, mapping.output);
  }
  console.log('# step 2');
  console.log(mapping);

  // Loop through and normalize each axis
  for (var axis in mapping) {
    if (isController(mapping[axis].input)) {
      mapping[axis].input = mapping[axis].input.getControllerAxes()[axis];
      if (!mapping[axis].input) {
        throw new Error('The controller supplied for axis "' + axis + '" does not have an "' + axis + '" axis');
      }
    }
    if (mapping[axis].input instanceof events.EventEmitter) {
      mapping[axis].input = {
        isInverted: false,
        source: mapping[axis].input
      };
    }
    if (isDriver(mapping[axis].output)) {
      mapping[axis].output = mapping[axis].output.getDriverAxes()[axis];
      if (!mapping[axis].output) {
        throw new Error('The driver supplied for axis "' + axis + '" does not have an "' + axis + '" axis');
      }
    }
    if (mapping[axis].output.move) {
      mapping[axis].output = {
        isInverted: false,
        source: mapping[axis].output
      };
    }
  }

  console.log('# step 3');
  console.log(mapping);
}

function getMapping(controller, driver) {
  var controllerAxes = controller.getControllerAxes();
  var controllerAxesLabels = Object.keys(controllerAxes).sort(); // Sort to enforce order
  var driverAxes = driver.getDriverAxes();
  var driverAxesLabels = Object.keys(driverAxes).sort(); // Sort to enforce order

  // Make sure we have the same number of axes for the controller and driver
  if (controllerAxesLabels.length != driverAxesLabels.length) {
    throw new Error('Controller axes (' + controllerAxesLabels.join() +
      ') do not match driver axes (' + driverAxesLabels.join() + ')');
  }

  // Map each axis from the controller to the driver, ensuring that they are
  // labelled the same
  var mappings = {};
  for (var i = 0; i < controllerAxesLabels.length; i++) {
    if (controllerAxesLabels[i] != driverAxesLabels[i]) {
      throw new Error('Controller axes (' + controllerAxesLabels.join() +
        ') do not match driver axes (' + driverAxesLabels.join() + ')');
    }
    var axisLabel = controllerAxesLabels[i];
    mappings[axisLabel] = {
      input: controllerAxes[axisLabel],
      output: driverAxes[axisLabel]
    };
  }
  return mappings;
}

function isController(obj) {
  return !!obj.getControllerAxes;
}

function isDriver(obj) {
  return !!obj.getDriverAxes;
}
