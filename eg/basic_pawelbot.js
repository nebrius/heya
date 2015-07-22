process.env.HEYA_DEBUG_LOGGING = true;
var heya = require('../lib/index.js');
var Spark = require('spark-io');

var controller = new heya.WebKeyboard();

var bot = new heya.DifferentialServos({
  leftServo: 'A0',
  rightServo: 'A1',
  io: new Spark({
    token: '04b67559fde8c137c38b1d01525530e7f0a9e016',
    deviceId: '53ff6f066667574847132167'
  })
});

heya.connect([{
  input: controller.direction.x,
  output: bot.wheels.left
}, {
  input: controller.direction.y,
  output: bot.wheels.right
}]);

heya.run(function() {
  console.log('Fly my pretties!');
});
