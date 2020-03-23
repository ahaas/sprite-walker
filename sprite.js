/* Constants */
const frameWidth = 64;
const frameHeight = 64;
const dtThreshold = 0.0667;  // How often to advance anim frame.
const lastFrame = 8;


/* Helper functions */
const drawFrame = (img, frameX, frameY, canvasX, canvasY, ctx) => {
  ctx.drawImage(img, frameX * frameWidth, frameY * frameHeight,
                frameWidth, frameHeight,
                canvasX, canvasY, frameWidth, frameHeight);
};


/* Object constructors */
function Sprite(path) {
  /* Initialization */
  this.img = new Image();
  this.img.src = path;
  this.img.onload = () => {
    this.initialized = true;
  };

  /* State variables */
  this.isWalking = false;
  this.animFrame = 0;
  this.dir = 2;  // [up, left, down, right]
  this.dt = 0;
}

Sprite.prototype.setWalking = function(isWalking) {
  this.isWalking = isWalking;
  if (!this.isWalking) {
    this.animFrame = 0;
    this.dt = 0;
  }
}

Sprite.prototype.draw = function(dt, ctx) {
  if (!this.initialized) return;

  if (this.isWalking) {
    this.dt += dt;
    if (this.dt > dtThreshold) {
      this.dt = 0;
      this.animFrame += 1;
    }
    if (this.animFrame > lastFrame) this.animFrame = 1;
  }
  drawFrame(this.img, this.animFrame, this.dir, this.x, this.y, ctx);
}


export { Sprite };
