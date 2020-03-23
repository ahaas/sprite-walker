import { Sprite } from './sprite.js';

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 480;
document.body.appendChild(canvas);

const ply = new Sprite('img/lpc_entry/png/walkcycle/BODY_male.png');
ply.x = 400;  // TODO: Move to constructor?
ply.y = 240;

let lastTime = Date.now();
let pressedKeys = {};
function main() {
  let now = Date.now();
  let dt = (now - lastTime) / 1000.0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update(dt);
  ply.draw(dt, ctx);

  lastTime = now;
  requestAnimationFrame(main);
}
main();

function update(dt) {
  if (!ply.isWalking) return;

  const speed = 100;
  const vert = 0.9;  // Vertical speed factor.
  switch (ply.dir) {
    case 0: ply.y -= dt * speed * vert; break;
    case 1: ply.x -= dt * speed; break;
    case 2: ply.y += dt * speed * vert; break;
    case 3: ply.x += dt * speed; break;
  }
}

const setKey = (event, isPressed) => {
  switch (event.keyCode) {
    case 38: pressedKeys.up = isPressed; break;  // up
    case 37: pressedKeys.left = isPressed; break;  // left
    case 40: pressedKeys.down = isPressed; break;  // down
    case 39: pressedKeys.right = isPressed; break;  // right
  }
  // Force direction change when a new key is pressed.
  if (isPressed) {
    ply.setWalking(true);
    switch (event.keyCode) {
      case 38: ply.dir = 0; break;  // up
      case 37: ply.dir = 1; break;  // left
      case 40: ply.dir = 2; break;  // down
      case 39: ply.dir = 3; break;  // right
    }
  } else {
    if (pressedKeys.up) ply.dir = 0;
    else if (pressedKeys.left) ply.dir = 1;
    else if (pressedKeys.down) ply.dir = 2;
    else if (pressedKeys.right) ply.dir = 3;
    else ply.setWalking(false);
  }
}

document.addEventListener('keydown', (e) => setKey(e, true));
document.addEventListener('keyup', (e) => setKey(e, false));
window.addEventListener('blur', () => ply.setWalking(false));
