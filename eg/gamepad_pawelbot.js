var heya = require('../lib/index.js');

var controller = new heya.Gamepad({
  type: heya.Gamepad.CYBORG_EVO
});

var bot = new heya.DifferentialServos({
  leftServo: 'A0',
  rightServo: 'A1'
});

heya.connect({
  input: {
    x: controller.primary.x,
    y: {
      source: controller.primary.y,
      invert: true
    }
  },
  output: bot.wheels.left
});

heya.run(function() {
  console.log('Fly my pretties!');
});
