const SPEED_INIT = 0.025;
const SPEED_UP = 0.00001;

export default class Ball {
  constructor(ball) {
    this.ball = ball;
    this.reset();
  }
  get x() {
    //here will get position of a ball from css property
    return parseFloat(
      getComputedStyle(
        this.ball /*this ball will obtain property of position */
      ).getPropertyValue("--x")
    ); //converting this value to float
  }
  set x(pos) {
    //will set x to prop value to move a ball
    this.ball.style.setProperty("--x", pos);
  }
  get y() {
    //here will get position of a ball from css property
    return parseFloat(
      getComputedStyle(
        this.ball /*this ball will obtain property of position */
      ).getPropertyValue("--y")
    ); //converting this value to float
  }
  set y(pos) {
    //will set x to prop value to move a ball
    this.ball.style.setProperty("--y", pos);
  }
  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0 }; //initial direction
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      /**check if current direction is straight between platform or up and down */
      const headingTo = randomHeading(0, 2 * Math.PI); //calculating random direction
      this.direction = { x: Math.cos(headingTo), y: Math.sin(headingTo) }; //updating direction with random values
    }
    this.speed = SPEED_INIT; //initial value for velocity
    console.log(this.direction);
  }

  update(delta, platforms) {
    this.x += this.direction.x * this.speed * delta; //direction of the ball multiple speed*delays between the frames to make ball move larger distance with long delays
    this.y += this.direction.y * this.speed * delta; //direction of the ball multiple speed*delays between the frames to make ball move larger distance with long delays
    this.speed += SPEED_UP * delta; //increasing velocity x delta
    const ballPosition = this.borders();
    console.log(ballPosition.right);
    if (ballPosition.bottom >= window.innerHeight || ballPosition.top <= 0) {
      this.direction.y *= -1;
    }
    if (platforms.some((p) => isPlatformHit(p, ballPosition))) {
      this.direction.x *= -1;
    }
  }
  borders() {
    return this.ball.getBoundingClientRect();
  }
}
function isPlatformHit(platform, ballPos) {
  return (
    platform.left <= ballPos.right &&
    platform.right >= ballPos.left &&
    platform.top <= ballPos.bottom &&
    platform.bottom >= ballPos.top
  );
}
function randomHeading(min, max) {
  return Math.random() * (max - min) + min;
}
