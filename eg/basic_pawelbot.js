var heya = require('../lib/index.js');

var controller = new heya.WebKeyboard();

var bot = new heya.DifferentialServos({
  leftServo: 'A0',
  rightServo: 'A1'
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
