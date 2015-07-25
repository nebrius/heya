var heya = require('../lib/index.js');

var controller = new heya.Gamepad({
  type: heya.Gamepad.CYBORG_EVO
});

var bot = new heya.DifferentialServos({
  leftServo: 'A0',
  rightServo: 'A1'
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
