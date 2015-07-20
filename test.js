global.HEYA_DEBUG_LOGGING = true;
var heya = require('./lib/index.js');

var controller = new heya.WebKeyboard();

var bot = new heya.DifferentialServos({
  leftServo: 'A0',
  rightServo: 'A1'
});

/*

The idea is that each controller and bot has a set of inputs and outputs. These
are all named according to their function, some of which may be mapped to
common outputs. Bots have basically the same thing. These default mappings
allow a controller to be hooked up to a bot without having to explicitly
specify which controller output gets mapped to which bot input.

The following forms show the different ways to map inputs to outputs, starting
with the most automagical going to the most explicit. The various mappings defined
by getControllerOutputs and getBotInputs are used to fill in the missing pieces
for the forms that don't explicitly define everything

 */

// Form 1

// Form 2
heya.connect([{
  input: controller.inputs.directionA.x,
  output: bot.outputs.directionA.x
}, {
  input: controller.inputs.directionA.y,
  output: bot.outputs.directionA.y
}]);

//// or

//heya.connect({
//  input: {
//    controller: controller,
//    source: 'x'
//  },
//  output: {
//    driver: bot,
//    destination: 'x'
//  }
//});
//heya.connect({
//  input: {
//    controller: controller,
//    source: 'y'
//  },
//  output: {
//    driver: bot,
//    destination: 'y'
//  }
//});
//
//
//// Form 3
//heya.connect([{
//  input: {
//    source: controller.x,
//    isInverted: true
//  },
//  output: {
//    source: bot.x,
//    isInverted: false
//  }
//}, {
//  input: {
//    source: controller.y,
//    isInverted: false
//  },
//  output: {
//    source: bot.y,
//    isInverted: true
//  }
//}]);
//
//// Form 5
//heya.connect({
//  input: {
//    source: controller.x,
//    isInverted: true
//  },
//  output: {
//    source: bot.x,
//    isInverted: false
//  },
//  filters: [
//    function(inputValue, inputType) {
//      if (inputType == heya.ANALOG_AXIS) {
//        inputValue = 0.5 * inputValue
//      }
//      return inputValue;
//    }
//  ]
//});
//heya.connect({
//  input: {
//    source: controller.y,
//    isInverted: false
//  },
//  output: {
//    source: bot.y,
//    isInverted: true
//  },
//  filters: [
//    function(inputValue, inputType) {
//      if (inputType == heya.ANALOG_AXIS) {
//        inputValue = 0.25 * inputValue
//      }
//      return inputValue;
//    }
//  ]
//});
//
//// Kitchen Sink vision for what this can do eventually
//var heya = require('heya');
//var dualShock = new heya.DualShockController();
//var rollingSpider = new heya.RollingSpider();
//heya.connect([{
//  input: dualShock.rightStick.x,
//  output: rollingSpider.roll
//}, {
//  input: dualShock.rightStick.y,
//  output: rollingSpider.pitch
//}, {
//  input: dualShock.leftStick.x,
//  output: rollingSpider.yaw
//}, {
//  input: dualShock.leftStick.y,
//  output: rollingSpider.altitude
//}, {
//  input: dualShock.xButton,
//  output: rollingSpider.camera
//}]);

heya.run(function() {
  console.log('Fly my pretties!');
});
