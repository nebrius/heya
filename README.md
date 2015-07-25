Heya
====

[![Join the chat at https://gitter.im/bryan-m-hughes/heya](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/nebrius/heya?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

n. [Heya](https://en.wikipedia.org/wiki/Heya_%28sumo%29): In sumo wrestling, a heya (部屋) is an organization of sumo wrestlers where they train and live.

Heya is a platform for quickly building directly controlled robots, such as a Sumobot. A Heya robot's software is split into two pieces: the controller and the driver. The controller takes input from some source and converts it into a common format. The driver then takes this normalized data and responds accordingly.

Splitting the software this way makes it easy to mix and match various controllers and drivers so that pesky interfacing bugs don't interfere with your path to glory!

Install with NPM:

```
npm install heya
```

## Example

This example uses the Web Keyboard controller and the Differential Servo driver for controlling an Arduino based [Sumobot Jr](https://github.com/makenai/sumobot-jr).

```JavaScript
var heya = require('heya');
var controller = new heya.WebKeyboard();
var driver = new heya.DifferentialServos({
  leftServo: 'A0',
  rightServo: 'A1'
});

heya.connect([{
  input: controller.direction.x,
  output: driver.wheels.left
}, {
  input: controller.direction.y,
  output: driver.wheels.right
}]);

heya.run(function() {
  console.log('Let's Sumo!');
});
```

For more examples, check out the [examples](eg) folder.

## Included Controllers

### Web Keyboard

The Web Keyboard starts a web server that you access from a browser. Within the browser, use the arrow keys or WASD keys to control the bot.

_Options_:

<table>
  <thead>
    <tr>
      <th>Option</th>
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

_Available Inputs_:

<table>
  <thead>
    <tr>
      <th>Input</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>direction</td>
    <td>2D axis</td>
    <td>This single input converts four buttons into an 8-way direction, like a d-pad on a game controller</td>
  </tr>
</table>

<!--
### Digital Joystick

The Digital Joystick uses a microcontroller to read values from a four-way contact joystick, similar to a d-pad on a game controller.

_Options_:

<table>
  <thead>
    <tr>
      <th>Option</th>
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
-->

### Gamepad

The Gamepad reads from a USB based gaming device, such as a joystick or PlayStation controller. This controller offers a set of gamepad templates for wiring up some common game controllers, although you can also pass in your own custom template.

_Options_:

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>type</td>
    <td>heya.Gamepad.CYBORG_EVO | custom</td>
    <td>The controller mapping to use</td>
  </tr>
  <tr>
  <td></td>
  <td colspan="2">
    <table>
      <thead>
        <th>Name</th>
        <th>Description</th>
      </thead>
      <tr>
        <td>CYBORG_EVO</td>
        <td><a href="http://gamergear.wikia.com/wiki/Cyborg_Evo_Joystick">Saitek Cyborg Evo</a> USB joystick</td>
      </tr>
    </table>
  </td>
  </tr>
</table>

_Available Inputs_:

THe available inputs are dependent on the ```type``` option passed in. See the table below for the inputs provided by the built-in templates, or the section on template format below to see how custom templates are mapped.

_Cyborg Evo Inputs_:

<table>
  <thead>
    <tr>
      <th>Input</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>primary</td>
    <td>2D axis</td>
    <td>The main stick movement, i.e. pushing forward, backward, left, or right</td>
  </tr>
  <tr>
    <td>yaw</td>
    <td>1D axis</td>
    <td>Twisting the stick clockwise or counterclockwise</td>
  </tr>
  <tr>
    <td>throttle</td>
    <td>1D axis</td>
    <td>This is the lever at the base of the stick</td>
  </tr>
  <tr>
    <td>trigger</td>
    <td>Button</td>
    <td>The main trigger on the stick</td>
  </tr>
  <tr>
    <td>button1 - button5</td>
    <td>Button</td>
    <td>The buttons labeled "1" through "5" on the head of the stick</td>
  </tr>
  <tr>
    <td>buttonF1 - buttonF4</td>
    <td>Button</td>
    <td>THe function buttons on the sides of the base labeled "F1" through "F4"</td>
  </tr>
  <tr>
    <td>leftUpButton, rightUpButton</td>
    <td>Button</td>
    <td>The button above the F buttons labeled as "^" on either side of the base</td>
  </tr>
</table>

#### Template Format

The gamepad controller uses [node-gamepad](https://github.com/creationix/node-gamepad) under the hood. I recommend familiarizing yourself with the naming and numbering scheme that it uses when creating a custom template. To create a custom template, pass in an object with the following structure:

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tr>
    <td>axes</td>
    <td>Object</td>
    <td>A collection of named 1D or 2D axes on the gamepad. Each key is the name, and the value is an array of one or two numbers for a 1D or 2D input, respectively. The number(s) are the <code>axis</code> options sent by node-gamepad in <code>move</code> events</td>
  </tr>
  <tr>
    <td>buttons</td>
    <td>Object</td>
    <td>A collection of named buttons on the gamepad. Each key is the name, and the value is a number. The number is the <code>num</code> option sent by node-gamepad in <code>up</code> and <code>down</code> events</td>
  </tr>
</table>

Each axis or button name gets mapped to an input on the Gamepad instance. Consider the following example:

```JavaScript
{
  axes: {
    primary: [ 0, 1 ]
  },
  buttons: {
    a: 0,
    b: 1
  }
}
```

This creates one 2D axis called ```primary``` and two buttons called ```a``` and ```b```. The axis gets mapped as ```myGamepadInstance.primary```, ```myGamepadInstance.a```, and ```myGamepadInstance.b```, respectively.

## Included Drivers

### Differential Servo

The Differential Servo driver drives any robot that uses two servos in a differential configuration, such as the [Sumobot Jr](https://github.com/makenai/sumobot-jr). Steering is accomplished via throttling the two wheels at different speeds. This driver should be used when the node instance running Heya directly calls Johnny-Five.
 
_Options_:

<table>
  <thead>
    <tr>
      <th>Option</th>
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

<!--
### Remote Differential Driver

The Remote Pawel Bot driver works the same as the normal Pawel Bot driver, except that it connects to a remote host that actually drives the motors, such as a Raspberry Pi, Beagle Bone Black, etc. Use this in conjunction with the [heya-remote-pawel-bot](https://github.com/bryan-m-hughes/heya-remote-pawel-bot) moudle running on the remote host.
 
_Options_:

<table>
  <thead>
    <tr>
      <th>Option</th>
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
-->

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