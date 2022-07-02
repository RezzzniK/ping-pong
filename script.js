import Ball from "./ball.js";
import Platform from "./platform.js";

const ball = new Ball(document.getElementById("ballID"));
const playerPlatform = new Platform(document.getElementById("plr-platform-id"));
const cmpPlatform = new Platform(document.getElementById("cmp-platform-id"));
let lastTime;
function update(time) {
  let delta;
  if (lastTime) {
    delta = time - lastTime;
    //ball.update(delta);
    cmpPlatform.update(delta, ball.y);
    if (isLose()) {
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
  const ballPosition = ball.borders();
  return ballPosition.right >= window.innerWidth || ballPosition.left <= 0;
}
document.addEventListener("keydown", (e) => {
  if (e.keyCode == "38") {
    playerPlatform.position -= (45 / window.innerHeight) * 100;
    //up key
  } else if (e.keyCode == "40") {
    playerPlatform.position += (25 / window.innerHeight) * 100;
    //down key
  }
});
window.requestAnimationFrame(update); //will perform update every time that smthg
//on the screen has changed
