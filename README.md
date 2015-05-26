Heya
====

n. [Heya](https://en.wikipedia.org/wiki/Heya_%28sumo%29): In sumo wrestling, a heya (部屋) is an organization of sumo wrestlers where they train and live.

Heya is a platform for quickly building sumobots. A Heya sumobot's software is split into two pieces: the controller and the driver. The controller takes input from some source and converts it into a common format. The driver then takes this normalized data and drives the motors.

Splitting the software this way makes it easy to mix and match various controllers and drivers.

Install with NPM:

```
npm install heya
```

## Examples

This example uses the Web Keyboard controller and the Pawel Bot driver for controlling an Arduino based sumobot.

```JavaScript
var heya = require('heya');

heya.create({
  controller: new heya.controllers.WebKeyboard(),
  driver: new heya.drivers.PawelBot({
    leftServo: 'A0',
    rightServo: 'A1'
  })
});
```

## Included Controllers

### Web Keyboard

The Web Keyboard starts a web server that you access from a browser. Within the browser, use the arrow keys or WASD keys to control the bot.

_Options_:

<table>
  <thead>
    <tr>
      <th>Options</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>port (optional)</td>
    <td>Number</td>
    <td>The port for the server to listen on</td>
  </tr>
</table>

```JavaScript
var heya = require('heya');

heya.create({
  controller: new heya.controllers.WebKeyboard(),
  driver: ...
});
```

### Digital Joystick

The Digital Joystick uses a microcontroller to read values from a four-way contact joystick, e.g. a d-pad on a game controller.

_Options_:

<table>
  <thead>
    <tr>
      <th>Options</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>io (optional)</td>
    <td>Johnny-Five IO-plugin instance</td>
    <td>An instance of a Johnny-Five IO plugin to use to read the joystick values</td>
  </tr>
  <tr>
    <td>left | right | up | down</td>
    <td>Number</td>
    <td>The pin number for each of the four direction contacts</td>
  </tr>
</table>

```JavaScript
var heya = require('heya');

heya.create({
  controller: new heya.controllers.DigitalJoystick({
    left: '5',
    right: '2',
    up: '3',
    down: '4'
  }),
  driver: ...
});
```

## Included Drivers

### Pawel Bot

The Pawel Bot driver drivers any sumobot that uses two servos in a differential configuration. Steering is accomplished via throttling the two wheels at different speeds. This incarnation of the Pawel Bot is used when the node instance running Heya directly calls Johnny-Five.
 
_Options_:

<table>
  <thead>
    <tr>
      <th>Options</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>io (optional)</td>
    <td>Johnny-Five IO-plugin instance</td>
    <td>An instance of a Johnny-Five IO plugin to use to drive the motors</td>
  </tr>
  <tr>
    <td>leftServo | rightServo</td>
    <td>Number</td>
    <td>The pin number for each of the two servos</td>
  </tr>
</table>

```JavaScript
var heya = require('heya');
var Spark = require('spark-io');

heya.create({
  controller: ...,
  driver: new heya.drivers.PawelBot({
    leftServo: 'A0',
    rightServo: 'A1',
    io: new Spark({
      token: process.env.SPARK_TOKEN,
      deviceId: process.env.SPARK_DEVICE_ID
    })
  })
});
```

### Remote Pawel Bot

The Remote Pawel Bot driver works the same as the normal Pawel Bot driver, except that it connects to a remote host that actually drives the motors, such as a Raspberry Pi, Beagle Bone Black, etc. Use this in conjunction with the [heya-remote-pawel-bot](https://github.com/bryan-m-hughes/heya-remote-pawel-bot) moudle running on the remote host.
 
_Options_:

<table>
  <thead>
    <tr>
      <th>Options</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>url</td>
    <td>string</td>
    <td>The base URL of the remote server, minus a trailing slash, e.g. "http://1.2.3.4:8000"</td>
  </tr>
</table>

```JavaScript
var heya = require('heya');

heya.create({
  controller: ...,
  driver: new heya.drivers.RemotePawelBot({
    url: 'http://1.2.3.4:8000'
  })
});
```

## Custom controllers and drivers

### Controllers

A controller extends EventEmitter and emits a ```move``` event when input is received. The move event payload is an object with two properties: ```x``` and ```y```. These two values can be thought of as representing the position of an analog joystick.

The controller also must implement a ```connect``` instance method. The connect method is where any initialization should take place. This method takes a single argument, a callback, that is to be called once initialization is complete.

See the [Digital Joystick](src/controllers/digital_joystick/digital_joystick.js) for an example.

### Drivers

A driver implements two instance methods, but does not extend EventEmitter. Drivers must implement a ```connect``` method that behaves the same as a controller's ```connect``` method.

Drivers also must implement a ```move``` method that takes an object indicating the direction to move in, which is one of the values emitted by a controller.

See the [Pawel Bot](src/drivers/pawel_bot.js) for an example.

License
=======

The MIT License (MIT)

Copyright (c) 2015 Bryan Hughes bryan@theoreticalideations.com

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