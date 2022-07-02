import Ball from "./ball.js";
import Platform from "./platform.js";

const ball = new Ball(document.getElementById("ballID"));
const playerPlatform = new Platform(document.getElementById("plr-platform-id"));
const cmpPlatform = new Platform(document.getElementById("cmp-platform-id"));
const playerScore = document.getElementById("plr-score");
const compScore = document.getElementById("cmp-score");
let lastTime;
function update(time) {
  let delta;
  if (lastTime) {
    delta = time - lastTime;
    ball.update(delta, [
      playerPlatform.platformPhysics(),
      cmpPlatform.platformPhysics(),
    ]);
    cmpPlatform.update(delta, ball.y);
    if (isLose()) {
      ballOut();

      console.log("Lose");
    }
  }

  lastTime = time;
  //   const delta = time - lastTime;
  //   lastTime = time;
  //infinit loop in order to update animation
  //   console.log(delta);
  window.requestAnimationFrame(update);
}
function isLose() {
  //detecting ball out of borders
  const ballPosition = ball.borders();
  return ballPosition.right >= window.innerWidth || ballPosition.left <= 0;
}
function ballOut() {
  //handaling score state when ball out of field
  const ballPOs = ball.borders();
  if (ballPOs.right >= window.innerWidth) {
    playerScore.textContent = +playerScore.textContent + 1;
  } else {
    compScore.textContent = +compScore.textContent + 1;
  }
  ball.reset();
  cmpPlatform.reset();
  playerPlatform.reset();
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode == "38") {
    playerPlatform.position -= (118 / window.innerHeight) * 100;
    //up key
  } else if (e.keyCode == "40") {
    playerPlatform.position += (118 / window.innerHeight) * 100;
    //down key
  }
});
window.requestAnimationFrame(update); //will perform update every time that smthg
//on the screen has changed
