const spaceship = new Image();
spaceship.src = "../client/media/img/spritesheet.png";

class Rocket {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0;
    this.originalWidth = 802;
    this.originalHeight = 602; 
    this.width = this.originalWidth/20;
    this.height = this.originalHeight/20;
    this.weight = 1;
  }
  update() {
    let curve = Math.sin(angle) * 20;
    if (this.y > canvas.height - this.height * 3 + curve) {
      this.y = canvas.height - this.height * 3 + curve;
      this.vy = 0;
    } else {
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }

    if (spacePressed) this.flap();
  }
  draw() {
    ctx.fillStyle = "#30f";
    //ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(spaceship, 0, 0, this.originalWidth, this.originalHeight, this.x - 20, this.y - 12, this.width * 2, this.height * 2);
  }
  flap() {
    this.vy -= 2;
  }
}

let rocket = new Rocket();