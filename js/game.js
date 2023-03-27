const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const media_main = document.getElementById("media_main");
const media = document.getElementById('media');
const media_boom = document.getElementById('media_boom');
const modalEL = document.querySelector ('#modalEL');
const buttonEL = document.querySelector ('#buttonEL');
const modalScoreEL = document.querySelector('#modalScoreEL');


canvas.width =  window.innerWidth;
canvas.height = window.innerHeight;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 1.5;
const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#fff");
gradient.addColorStop("0.5", "#000");
gradient.addColorStop("0.55", "#4040ff");
gradient.addColorStop("0.6", "#000");
gradient.addColorStop("0.65", "#fff");


const background = new Image();
background.src = "../client/media/img/19333449.jpg";
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
    }

    
function init(){
  spacePressed = false;
  angle = 0;
  hue = 0;
  frame = 0;
  score = 0;
  rocket = new Rocket();
  particlArray = [];
  obstaclesArray = [];
  }

function handleBackground(){
    if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
    else BG.x1 -= gamespeed;
    if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
    else BG.x2 -= gamespeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
     ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //ctx.fillRect(10, canvas.height - 90, 50, 50);
  handleBackground();
  handleObstacle();
  handleParticles();
  rocket.update();
  rocket.draw();
  ctx.fillStyle = gradient;
  ctx.font = "75px Sand";
  ctx.strokeText(score, canvas.width/8, 70);
  ctx.fillText(score, canvas.width/8, 70);
  media_main.play();
  

  handleCollision();
  if (handleCollision()) return;
  requestAnimationFrame(animate);
  angle += 0.12;
  hue++;
  frame++;
}

animate();
window.addEventListener("keydown", function (e) {
  if (e.code === "Space"||e.code === "touchstart") spacePressed = true;
    media.play();
});

window.addEventListener("keyup", function (e) {
  if (e.code === "Space"||e.code === "touchstart") spacePressed = false;   
});

const bang = new Image();
bang.src = "../client/media/img/bang.png";

function handleCollision() {
  for (var i = 0; i < obstaclesArray.length; i++) {
    if (
      rocket.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      rocket.x + rocket.width > obstaclesArray[i].x &&
      ((rocket.y < 0 + obstaclesArray[i].top && rocket.y + rocket.height > 0) ||
        (rocket.y > canvas.height - obstaclesArray[i].bottom &&
          rocket.y + rocket.height < canvas.height))
    ) {
      ctx.drawImage(bang, rocket.x, rocket.y, 50, 50);
      media_boom.play();
      media_main.pause();
      media.pause();
      ctx.font = "30px Sand";
      ctx.fillStyle = "white";
      
      let textString = ("Game Over! Your Score is "+ score);
      textWidth = ctx.measureText(textString).width; 
      ctx.fillText(
      textString,
      (canvas.width/2) - (textWidth / 2),
      canvas.height / 2 - 10
      );
      modalEL.style.display = 'grid';
      modalScoreEL.innerHTML = score;
      buttonEL.style.display = 'grid';
      
      buttonEL.addEventListener('click',()=> {
        init();
        animate();
        buttonEL.style.display = 'none';
        modalEL.style.display = 'none';
       
       })

      return true;
    }
  }
}

