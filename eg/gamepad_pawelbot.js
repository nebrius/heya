process.env.HEYA_DEBUG_LOGGING = true;
var heya = require('../lib/index.js');
var Spark = require('spark-io');

var controller = new heya.Gamepad({
  type: heya.Gamepad.CYBORG_EVO
});

var bot = new heya.DifferentialServos({
  leftServo: 'A0',
  rightServo: 'A1',
  io: new Spark({
    token: '04b67559fde8c137c38b1d01525530e7f0a9e016',
    deviceId: '53ff6f066667574847132167'
  })
});

heya.connect([{
  input: controller.primary.x,
  output: bot.wheels.left
}, {
  input: controller.primary.y,
  output: bot.wheels.right,
  isInverted: true
}]);

heya.run(function() {
  console.log('Fly my pretties!');
});
