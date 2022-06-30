import Ball from "./ball.js";
const ball = new Ball(document.getElementById("ballID"));
let lastTime;
function update(time) {
  let delta;
  lastTime && (delta = time - lastTime) && ball.update(delta);
  lastTime = time;
  //   const delta = time - lastTime;
  //   lastTime = time;
  //infinit loop in order to update animation
  //   console.log(delta);
  window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update); //will perform update every time that smthg
//on the screen has changed
