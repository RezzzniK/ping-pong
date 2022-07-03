import Ball from "./ball.js";
import Platform from "./platform.js";

main();
let videoElement;
let pageContent;
// On window load, attach an event to the play button click
// that triggers playback on the video element
window.addEventListener("load", function (event) {
  pageContent = this.document.getElementById("page-content");
  pageContent.style.opacity = 1;
  videoElement = document.getElementById("video-element");
});

function main() {
  document.addEventListener("keydown", EnterPlay);
}
function EnterPlay(event) {
  if (event.keyCode == "13") {
    document.getElementById("welcome").style.opacity = 0;
    document.getElementById("winner").style.opacity = 0;
    pageContent.style.opacity = 1;
    videoElement.play();
    console.log("enter the game");
    setTimeout(() => {
      videoElement.currentTime = videoElement.duration;
    }, 10000);

    videoElement.addEventListener("ended", videoEnded);
  }
  if (event.keyCode == "8") {
    window.location.href = "https://en.wikipedia.org/wiki/Pong";
  }
}
function videoEnded(event) {
  LetsPlay();
}
function LetsPlay() {
  pageContent.style.opacity = 0;
  document.removeEventListener("keydown", EnterPlay);
  document.removeEventListener("ended", videoEnded);

  const winMsg = document.getElementById("winner");
  const restart = document.getElementById("restart");
  const platformCssPlr = document.getElementById("plr-platform-id");
  const platformCssCmp = document.getElementById("cmp-platform-id");
  const ballCss = document.getElementById("ballID");
  const scoreCss = document.getElementById("score");
  turnOn();
  const ball = new Ball(document.getElementById("ballID"));
  const playerPlatform = new Platform(
    document.getElementById("plr-platform-id")
  );
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
      if (+playerScore.textContent == 1) {
        WinBanner("plr");
      }
    } else {
      compScore.textContent = +compScore.textContent + 1;
      if (+compScore.textContent == 1) {
        WinBanner("cmp");
      }
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
  function WinBanner(winner) {
    turnOff();
    winMsg.style.opacity = 1;
    restart.style.opacity = 1;
    if (winner === "cmp") {
      document.getElementById("player_mess").textContent =
        "👾👾👾YOU LOSE👾👾👾\nGAME OVER";
    } else {
      document.getElementById("player_mess").textContent =
        "YOU ARE THE BEST!!!!\n🏆🥇CONGRATULATIONS 🥇🏆";
    }
    document.getElementById("plr-score").textContent = 0;
    document.getElementById("cmp-score").textContent = 0;

    cmpPlatform.reset();
    playerPlatform.reset();
    document.addEventListener("keydown", EnterPlay);
  }
  function turnOff() {
    platformCssPlr.style.opacity = 0;
    platformCssCmp.style.opacity = 0;
    ballCss.style.opacity = 0;
    scoreCss.style.opacity = 0;
  }
  function turnOn() {
    platformCssPlr.style.opacity = 1;
    platformCssCmp.style.opacity = 1;
    ballCss.style.opacity = 1;
    scoreCss.style.opacity = 1;
    winMsg.style.opacity = 0;
    restart.style.opacity = 0;
  }
}

/**ads */
