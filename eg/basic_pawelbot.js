var heya = require('../lib/index.js');

var controller = new heya.WebKeyboard();

var bot = new heya.DifferentialServos({
  leftServo: 'A0',
  rightServo: 'A1'
});

heya.connect({
  input: {
    x: controller.direction.x,
    y: controller.direction.y
  },
  output: bot.wheels
});

heya.run(function() {
  console.log('Fly my pretties!');
});
