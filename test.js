function foo(x, y) {
  function form(num) {
    num = num.toFixed(3);
    if (num[0] != '-') {
      num = ' ' + num;
    }
    return num;
  }
  var angle = Math.atan(y / x);
  if (x >= 0 && y >= 0) {
    angle = angle;
  } else if (x < 0 && y >= 0) {
    angle = angle + Math.PI;
  } else if (x < 0 && y < 0) {
    angle = angle + Math.PI;
  } else if (x >= 0 && y < 0) {
    angle = angle + 2 * Math.PI;
  }
  console.log(form(x), form(y), form(angle));
}

// 0      <= theta <= pi/2   = 0     -> pi/2 = theta
// pi/2   <  theta <= pi     = -pi/2 -> 0    = theta + pi
// pi     <  theta <  3*pi/2 = 0     -> pi/2 = theta + pi
// 3*pi/2 <= theta <  2*pi   = -pi/2 -> 0    = theta + 3*pi/2

console.log('------');
foo(1, -0.1);
foo(1, 0);
foo(1, 0.1);
console.log('------');
foo(0.707, 0.707);
console.log('------');
foo(0.1, 1);
foo(0, 1);
foo(-0.1, 1);
console.log('------');
foo(-0.707, 0.707);
console.log('------');
foo(-1, 0.1);
foo(-1, 0);
foo(-1, -0.1);
console.log('------');
foo(-0.707, -0.707);
console.log('------');
foo(-0.1, -1);
foo(0, -1);
foo(0.1, -1);
console.log('------');
foo(0.707, -0.707);
console.log('------');
foo(1, -0.1);
foo(1, 0);
foo(1, 0.1);
console.log('------');
